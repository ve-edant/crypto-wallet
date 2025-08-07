"use client";
// app/dashboard/coin/[id]/page.tsx

import { DottedLineChart } from "@/app/Components/UI/DottedChart";
import { useParams } from "next/navigation";
import CoinInfo from "./CoinInfo";

export default function CoinChartPage() {
  const params = useParams();
  const coinId = String(params.id);

  return (
    <main className="p-2 space-y-6">
      <div className="w-full max-w-4xl mx-auto">
        <DottedLineChart coinId={coinId} currency="usd"/>
      </div>

      <CoinInfo id={coinId} />
    </main>
  );
}
