"use client";

import React, { useEffect, useState } from "react";

interface CoinInfoProps {
  id: string; // e.g., "bitcoin"
}

const CoinInfo: React.FC<CoinInfoProps> = ({ id }) => {
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoin() {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        if (!res.ok) throw new Error("Failed to fetch coin data");
        const data = await res.json();
        setCoin(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchCoin();
  }, [id]);

  if (loading) return <div className="text-center text-sm">Loading coin info...</div>;
  if (error) return <div className="text-red-500 text-sm">Error: {error}</div>;

  return (
    <div className="space-y-4 p-2 md:p-6 text-sm max-w-2xl">
      <div className="text-xl font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</div>

      {coin.image?.small && (
        <img src={coin.image.small} alt={`${coin.name} logo`} className="w-8 h-8" />
      )}

      {coin.description?.en && (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{
            __html: coin.description.en.split(". ")[0] + ".",
          }}
        />
      )}

      <div>
        <strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}
      </div>

      <div>
        <strong>Market Cap:</strong> ${coin.market_data.market_cap.usd.toLocaleString()}
      </div>

      <div>
        <strong>24h High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()} | 
        <strong> Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}
      </div>

      <div>
        <strong>Genesis Date:</strong> {coin.genesis_date || "N/A"}
      </div>

      <div>
        <strong>Homepage:</strong>{" "}
        <a
          href={coin.links.homepage[0]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {coin.links.homepage[0]}
        </a>
      </div>
    </div>
  );
};

export default CoinInfo;
