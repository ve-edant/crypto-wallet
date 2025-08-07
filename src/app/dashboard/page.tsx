"use client";

import { useSession } from "next-auth/react";
import MarketSection from "./MarketSection";
import WalletSection from "./WalletSection";

export default function DashoardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return (
    <main className="min-h-screen flex flex-col md:flex-row-reverse">
      {/* Right: Wallet Section */}
      <div className="bg-gray-50 max-w-2xl">
        <WalletSection />
      </div>

      {/* Left: Market Section */}
      <div className="bg-white w-full border-r border-gray-200">
        <MarketSection />
      </div>
    </main>
  );
}
