"use client";

import { useEffect, useState } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

const currencies = ["usd", "inr", "eur"];

const DiscoverPage = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sort, setSort] = useState("market_cap_desc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sort}&per_page=100&page=1`
        );
        const data = await res.json();
        setCoins(data);
      } catch (err: any) {
        setError("Failed to fetch coin data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, sort]);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-2 space-y-6">
      <h1 className="text-2xl font-semibold">Discover Coins</h1>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or symbol"
          className="px-3 py-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="market_cap_desc">Market Cap ↓</option>
          <option value="market_cap_asc">Market Cap ↑</option>
          <option value="volume_desc">Volume ↓</option>
          <option value="volume_asc">Volume ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="price_asc">Price ↑</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-y-auto max-h-[600px]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="text-left p-2">Coin</th>
                <th className="text-right p-2">
                  Price ({currency.toUpperCase()})
                </th>
                <th className="text-right p-2">Market Cap</th>
                <th className="text-right p-2">24h % Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr key={coin.id} className="border-t hover:bg-gray-50">
                  <td className="flex items-center gap-3 p-2">
                    <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                    <span>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </td>
                  <td className="text-right p-2">
                    {coin.current_price.toLocaleString()}
                  </td>
                  <td className="text-right p-2">
                    {coin.market_cap.toLocaleString()}
                  </td>
                  <td
                    className={`text-right p-2 ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
