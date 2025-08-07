"use client";

import {
  CartesianGrid,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Area,
  ResponsiveContainer,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface DottedLineChartProps {
  coinId: string;
  currency: string;
}

const TIME_RANGES = [
  { label: "1D", value: 1 },
  { label: "7D", value: 7 },
  { label: "1M", value: 30 },
  { label: "3M", value: 90 },
  { label: "1Y", value: 365 },
  { label: "YTD", value: 366 }, // special case
];

export function DottedLineChart({ coinId, currency }: DottedLineChartProps) {
  const [days, setDays] = useState<number>(7);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = "";

        if (days === 366) {
          const currentYear = new Date().getFullYear();
          const from = Math.floor(new Date(`${currentYear}-01-01`).getTime() / 1000);
          const to = Math.floor(Date.now() / 1000);
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${currency}&from=${from}&to=${to}`;
        } else {
          url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        const formattedData = data.prices.map(
          ([timestamp, price]: [number, number]) => {
            const date = new Date(timestamp);
            const label = `${date.getDate()}/${date.getMonth() + 1}`;
            return { date: label, price: Number(price.toFixed(2)) };
          }
        );

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data", error);
      }
    }

    fetchData();
  }, [coinId, currency, days]);

  const chartConfig = {
    price: {
      label: "Price",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="w-full max-w-5xl mx-auto p-0 md:p-2 space-y-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center p-2 md:p-0 justify-between gap-4">
        <h2 className="text-2xl font-semibold">{coinId.toUpperCase()} Price Chart</h2>
        <div className="flex gap-2 flex-wrap">
          {TIME_RANGES.map(({ label, value }) => (
            <button
              key={label}
              onClick={() => setDays(value as number)}
              className={cn(
                "px-3 py-1 text-sm rounded-md border transition",
                value === days
                  ? "bg-blue-600 text-white"
                  : "border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Body */}
      <div className="w-full h-fit bg-white dark:bg-zinc-900 rounded-xl p-4">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine axisLine tickMargin={8} padding={{ left: 0, right: 0 }} />
              <YAxis
                domain={["dataMin * 0.98", "dataMax * 1.02"]}
                tickLine={false}
                axisLine
                tickMargin={8}
              />
              <ChartTooltip cursor content={<ChartTooltipContent hideLabel />} />

              <Area
                type="linear"
                dataKey="price"
                stroke="#000000"
                strokeWidth={2}
                fill="url(#fillGradient)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}
