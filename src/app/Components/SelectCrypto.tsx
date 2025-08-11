import React, { useState, useEffect } from "react";

interface Asset {
  id: string;
  name: string;
  logo: string;
  price: number;
  balance: number;
}

interface SelectCryptoProps {
  assets: Asset[];
  onSelect: (asset: Asset) => void;
  onClose: () => void;
}

export const SelectCrypto: React.FC<SelectCryptoProps> = ({
  assets,
  onSelect,
  onClose,
}) => {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState<Asset[]>(assets);

  useEffect(() => {
    setFiltered(
      assets.filter(
        (a) =>
          a.id.toLowerCase().includes(search.toLowerCase()) ||
          a.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, assets]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute bg-white text-black md:rounded-lg w-full h-full md:h-auto sm:w-[600px] sm:top-0 md:top-15 sm:bottom-0 md:bottom-15 overflow-y-auto">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <h2 className="text-lg font-semibold text-black">Select Crypto</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Search symbol or name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-black bg-gray-300 px-3 py-2 rounded-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Token List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onSelect(asset)}
              className="flex items-center justify-between p-3  rounded-lg hover:bg-gray-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={asset.logo}
                  alt={asset.id}
                  className="w-6 h-6 rounded-full"
                />
                <div>
                  <p className="">{asset.id}</p>
                  <p className="text-sm">{asset.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="">{asset.balance}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center mt-4">No tokens found</p>
          )}
        </div>
      </div>
    </div>
  );
};
