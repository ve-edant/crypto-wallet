type CoinCardProps = {
  name: string;
  image: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export default function CoinCard({
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_24h,
  market_cap,
}: CoinCardProps) {
  return (
    <div className="p-4 border rounded-md shadow-sm hover:shadow-lg transition">
      <div className="flex items-center gap-2 mb-2">
        <img src={image} alt={name} className="w-6 h-6" />
        <h3 className="font-semibold">
          {name} ({symbol.toUpperCase()})
        </h3>
      </div>
      <p className="text-sm">Price: ${current_price.toLocaleString()}</p>
      <p
        className={`text-sm ${
          price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        24h: {price_change_percentage_24h.toFixed(2)}%
      </p>
      <p className="text-sm text-gray-500">
        Market Cap: ${market_cap.toLocaleString()}
      </p>
    </div>
  );
}
