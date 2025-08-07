"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
};

export default function MarketSection() {
  const router = useRouter();
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // will update dynamically
  const currency = "usd";

  useEffect(() => {
    const fetchTotalCoins = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const data = await res.json();
        const totalCoins = data.length;
        setTotalPages(Math.ceil(totalCoins / 10));
      } catch (error) {
        console.error("Failed to fetch total coins:", error);
      }
    };

    fetchTotalCoins();
  }, []);

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&sparkline=true`
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency, page]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Coins</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full overflow-x-auto">
            <table className="min-w-[900px] w-full bg-white  border-gray-200 text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="py-2 px-4 border-b sticky md:relative left-0 top-0 w-[140px] z-20 bg-gray-100">
                    Name
                  </th>
                  <th className="py-2 px-4 border-b">Price</th>
                  <th className="py-2 px-4 border-b">24h %</th>
                  <th className="py-2 px-4 border-b">Volume</th>
                  <th className="py-2 px-4 border-b">Market Cap</th>
                  <th className="py-2 px-4 border-b min-w-[120px]">7d</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin) => (
                  <tr key={coin.id} onClick={() => router.push(`/dashboard/coin/${coin.id}`)} className="bg-white hover:bg-gray-300 cursor-pointer">
                    {/* Name with Logo and Symbol */}
                    <td className="py-2 px-4 border-b sticky md:relative left-0 w-[80px] z-10 ">
                      <div className="flex items-center gap-3">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-6 h-6"
                        />
                        <div className="flex flex-col">
                          <span className="uppercase font-medium text-sm">
                            {coin.symbol}
                          </span>
                          <span className="text-xs text-gray-500">
                            {coin.name}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${coin.current_price.toLocaleString()}
                    </td>

                    <td className="py-2 px-4 border-b border-black">
                      <span
                        className={`${
                          coin.price_change_percentage_24h >= 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {coin.price_change_percentage_24h?.toFixed(2)}%
                      </span>
                    </td>

                    <td className="py-2 px-4 border-b">
                      ${coin.total_volume.toLocaleString()}
                    </td>

                    <td className="py-2 px-4 border-b">
                      ${coin.market_cap.toLocaleString()}
                    </td>

                    <td className="py-2 px-4 border-b min-w-[120px]">
                      <Sparklines
                        data={coin.sparkline_in_7d.price}
                        width={100}
                        height={30}
                        margin={4}
                      >
                        <SparklinesLine
                          color={
                            coin.price_change_percentage_24h >= 0
                              ? "#16a34a"
                              : "#dc2626"
                          }
                          style={{
                            strokeWidth: 2.5,
                            fill: "none",
                          }}
                        />
                      </Sparklines>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-2 overflow-x-auto whitespace-nowrap px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((pageNumber) => {
                return (
                  pageNumber === 1 || // First page
                  pageNumber === totalPages || // Last page
                  Math.abs(pageNumber - page) <= 1 || // Current ±1
                  pageNumber === page - 2 || // Ellipsis before
                  pageNumber === page + 2 // Ellipsis after
                );
              })
              .map((pageNumber, index, arr) => {
                const prevPage = arr[index - 1];

                // Add ellipsis if there’s a big gap from previous
                if (prevPage && pageNumber - prevPage > 1) {
                  return (
                    <span
                      key={`ellipsis-${pageNumber}`}
                      className="px-2 text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 border rounded text-sm ${
                      page === pageNumber
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}
