"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search, Download } from "lucide-react";

type StatCard = {
  id: string;
  label: string;
  value: string;
  hint?: string;
  delta?: number;
};
type Asset = {
  id: string;
  name: string;
  symbol: string;
  holders: number;
  totalBalance: string;
  change24h?: number;
};
type Tx = {
  id: string;
  user: string;
  type: "Send" | "Receive" | "Swap";
  amount: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
};

/* --------------------------- Mock / Demo Data --------------------------- */
const MOCK_STATS: StatCard[] = [
  {
    id: "s1",
    label: "Total Users",
    value: "1,245",
    hint: "Registered wallets",
  },
  {
    id: "s2",
    label: "Total Wallet Balance",
    value: "$2,451,210",
    hint: "All assets aggregated",
  },
  { id: "s3", label: "Total Transactions", value: "45,231", hint: "All-time" },
  {
    id: "s4",
    label: "24h Volume",
    value: "$152,340",
    hint: "Last 24 hours",
    delta: 12.4,
  },
  {
    id: "s5",
    label: "Active Users (24h)",
    value: "312",
    hint: "Wallet interactions",
  },
  {
    id: "s6",
    label: "Pending Withdrawals",
    value: "8",
    hint: "Action required",
  },
];

const MOCK_ASSETS: Asset[] = [
  {
    id: "a1",
    name: "Bitcoin",
    symbol: "BTC",
    holders: 542,
    totalBalance: "120 BTC",
    change24h: 2.1,
  },
  {
    id: "a2",
    name: "Ethereum",
    symbol: "ETH",
    holders: 728,
    totalBalance: "2,145 ETH",
    change24h: -0.5,
  },
  {
    id: "a3",
    name: "Tether",
    symbol: "USDT",
    holders: 880,
    totalBalance: "450,000 USDT",
    change24h: 0.0,
  },
  {
    id: "a4",
    name: "Solana",
    symbol: "SOL",
    holders: 321,
    totalBalance: "12,000 SOL",
    change24h: 5.3,
  },
  {
    id: "a5",
    name: "XRP",
    symbol: "XRP",
    holders: 278,
    totalBalance: "300,000 XRP",
    change24h: -1.4,
  },
];

const MOCK_TXS: Tx[] = [
  {
    id: "t1",
    user: "John Doe",
    type: "Send",
    amount: "0.5 BTC",
    status: "Completed",
    date: "2025-08-09",
  },
  {
    id: "t2",
    user: "Jane Smith",
    type: "Receive",
    amount: "1.2 ETH",
    status: "Pending",
    date: "2025-08-09",
  },
  {
    id: "t3",
    user: "Mark Lee",
    type: "Swap",
    amount: "500 USDT",
    status: "Completed",
    date: "2025-08-08",
  },
  {
    id: "t4",
    user: "Emily Chen",
    type: "Send",
    amount: "2 SOL",
    status: "Failed",
    date: "2025-08-08",
  },
  {
    id: "t5",
    user: "Zoe Park",
    type: "Receive",
    amount: "0.1 BTC",
    status: "Completed",
    date: "2025-08-07",
  },
];

/* --------------------------- Utilities --------------------------- */
const currency = (v: number) =>
  v.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
const debounce = (fn: Function, ms = 300) => {
  let t: any;
  return (...args: any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};
const exportCSV = (rows: any[], filename = "export.csv") => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [
    keys.join(","),
    ...rows.map((r) => keys.map((k) => `"${String(r[k] ?? "")}"`).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", filename);
  a.click();
  URL.revokeObjectURL(url);
};

/* ------------------------- Small Components ------------------------- */

function TopStatCard({ card }: { card: StatCard }) {
  return (
    <div
      role="article"
      aria-label={card.label}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">
            {card.value}
          </p>
        </div>
        <div className="text-right">
          {typeof card.delta === "number" ? (
            <div
              className={`px-2 py-1 rounded text-sm ${
                card.delta >= 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {card.delta > 0
                ? `▲ ${Math.abs(card.delta)}%`
                : `▼ ${Math.abs(card.delta)}%`}
            </div>
          ) : (
            <div className="text-xs text-gray-400">{card.hint}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Lightweight sparkline using SVG path from data points */
function Sparkline({
  values = [] as number[],
  color = "#2563EB",
}: {
  values?: number[];
  color?: string;
}) {
  const width = 120;
  const height = 28;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const d = `M${points.join(" L ")}`;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block"
    >
      <path
        d={d}
        stroke={color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------- Main Component ------------------------- */

export default function AdminDashboardPage() {
  const [stats] = useState<StatCard[]>(MOCK_STATS);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [transactions, setTransactions] = useState<Tx[]>(MOCK_TXS);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<{
    key: string;
    dir: "asc" | "desc";
  } | null>({ key: "date", dir: "desc" });
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // loading skeleton simulation (for UX)
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // TODO: fetch stats, assets, transactions via API
    // setLoading(true); fetch... setLoading(false);
  }, []);

  // debounced search
  useEffect(() => {
    const cancelable = debounce((q: string) => {
      setPage(1);
      // in prod, call API: fetch(`/api/admin/transactions?q=${q}`)
      // for now we just simulate filtering via state
      setTransactions((prev) =>
        MOCK_TXS.filter((tx) => tx.user.toLowerCase().includes(q.toLowerCase()))
      );
    }, 300);
    cancelable(query);
    return () => {
      /* noop */
    };
  }, [query]);

  const filteredTx = useMemo(() => {
    let list = [...transactions];
    if (query.trim())
      list = list.filter(
        (t) =>
          t.user.toLowerCase().includes(query.toLowerCase()) ||
          t.amount.toLowerCase().includes(query.toLowerCase())
      );
    if (sortBy) {
      list.sort((a: any, b: any) => {
        const av = a[sortBy.key as keyof Tx];
        const bv = b[sortBy.key as keyof Tx];
        if (av === bv) return 0;
        if (sortBy.dir === "asc") return av > bv ? 1 : -1;
        return av < bv ? 1 : -1;
      });
    }
    return list;
  }, [transactions, query, sortBy]);

  const pagedTx = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTx.slice(start, start + pageSize);
  }, [filteredTx, page]);

  // actions
  const handleExportTx = () => exportCSV(filteredTx, "transactions.csv");
  const handleExportAssets = () =>
    exportCSV(
      assets.map((a) => ({
        asset: a.name,
        symbol: a.symbol,
        holders: a.holders,
        totalBalance: a.totalBalance,
      })),
      "assets.csv"
    );

  // small helpers for UI
  const toggleSort = (key: string) => {
    setSortBy((s) =>
      s && s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "desc" }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          {/* Left - Title */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Overview of users, assets, and transactions
            </p>
          </div>

          {/* Right - Search + Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:flex-none">
              <input
                aria-label="Search transactions"
                placeholder="Search transactions or user..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={handleExportAssets}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm hover:bg-gray-50"
              >
                <Download size={16} /> Export Assets
              </button>
              <button
                onClick={handleExportTx}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 text-sm"
              >
                <Download size={16} /> Export Transactions
              </button>
            </div>
          </div>
        </div>

        {/* top cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <TopStatCard key={s.id} card={s} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* left: Assets */}
          {/* Top Assets */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Top Assets</h3>
                  <p className="text-sm text-gray-500">
                    Holdings and recent 24h change
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAssets((prev) => prev.slice())}
                    className="text-sm px-3 py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50"
                  >
                    Refresh
                  </button>
                  <button
                    onClick={handleExportAssets}
                    className="text-sm px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* Scrollable asset list */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    {/* Asset Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-sm font-medium text-gray-700">
                        {asset.symbol}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium truncate">
                            {asset.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            · {asset.symbol}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {asset.holders.toLocaleString()} holders
                        </div>
                      </div>
                    </div>

                    {/* Balance / Change / Sparkline */}
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-sm font-medium">
                        {asset.totalBalance}
                      </div>
                      <div
                        className={`text-sm ${
                          asset.change24h && asset.change24h > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {asset.change24h
                          ? asset.change24h > 0
                            ? `+${asset.change24h}%`
                            : `${asset.change24h}%`
                          : "--"}
                      </div>
                      <div className="w-[120px] flex-shrink-0">
                        <Sparkline
                          values={[1, 1.2, 1.1, 1.3, 1.15]}
                          color={
                            asset.change24h && asset.change24h > 0
                              ? "#16a34a"
                              : "#ef4444"
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* right: quick stats / recent users */}
          <aside className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium mb-2">Traffic (7d)</h4>
              <div className="flex items-end gap-4">
                <div>
                  <p className="text-2xl font-semibold">+12%</p>
                  <p className="text-xs text-gray-500">vs previous week</p>
                </div>
                <div>
                  <Sparkline
                    values={[10, 12, 9, 15, 14, 16, 18]}
                    color="#06b6d4"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium mb-2">Top Active Users</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Alice Johnson</div>
                    <div className="text-xs text-gray-400">
                      3 transactions today
                    </div>
                  </div>
                  <div className="text-sm font-medium">3.45 ETH</div>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">Bob Smith</div>
                    <div className="text-xs text-gray-400">
                      2 transactions today
                    </div>
                  </div>
                  <div className="text-sm font-medium">1.20 ETH</div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <h4 className="text-sm font-medium mb-2">Quick Actions</h4>
              <div className="flex flex-col gap-2">
                <button className="px-3 py-2 bg-yellow-50 text-yellow-700 rounded-md border border-yellow-100">
                  Review Pending Withdrawals
                </button>
                <button className="px-3 py-2 bg-red-50 text-red-700 rounded-md border border-red-100">
                  Manage Flags
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
