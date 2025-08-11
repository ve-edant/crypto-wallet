import React, { useState } from "react";

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

type Asset = {
  id: string;
  name: string;
  symbol: string;
  holders: number;
  totalBalance: string;
  change24h?: number;
};

type Props = {
  initialAssets: Asset[];
};

export function EditableBalanceAssetsList({ initialAssets }: Props) {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);

  const handleBalanceChange = (id: string, value: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, totalBalance: value } : asset
      )
    );
  };

  return (
    <div className="space-y-3 max-h-96 pr-2 overflow-x-auto">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className=" whitespace-nowrap scrollbar-thin scrollbar-thumb-gray-300"
        >
          <div className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-gray-50 transition min-w-[600px]">
            {/* Asset Info */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-sm font-medium text-gray-700 flex-shrink-0">
                {asset.symbol}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{asset.name}</div>
                  <div className="text-xs text-gray-400">· {asset.symbol}</div>
                </div>
                <div className="text-xs text-gray-500">
                  {asset.holders.toLocaleString()} holders
                </div>
              </div>
            </div>

            {/* Balance / Change / Sparkline */}
            <div className="flex items-center gap-6 flex-shrink-0">
              {/* Editable totalBalance */}
              {asset.totalBalance}

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
        </div>
      ))}
    </div>
  );
}
