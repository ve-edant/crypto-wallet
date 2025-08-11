"use client";

import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RiUserFill } from "react-icons/ri";
import { SelectCrypto } from "./SelectCrypto";

const mockAssets = [
  { id: "1", name: "Polygon (MATIC)", logo: "/matic-logo.png", price: 0.75, balance: 250 },
  { id: "2", name: "Ethereum (ETH)", logo: "/eth-logo.png", price: 1850.45, balance: 1.2 },
  { id: "3", name: "USD Coin (USDC)", logo: "/usdc-logo.png", price: 1, balance: 500 },
  { id: "4", name: "Bitcoin (BTC)", logo: "/btc-logo.png", price: 29450.78, balance: 0.05 },
  { id: "5", name: "Solana (SOL)", logo: "/sol-logo.png", price: 24.12, balance: 10 },
];

export default function SendForm({ onClose }: { onClose: () => void }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(mockAssets[0]);
  const [usdValue, setUsdValue] = useState(0);
  const [assetModalOpen, setAssetModalOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (amount && !isNaN(Number(amount))) {
      setUsdValue(Number(amount) * selectedAsset.price);
    } else {
      setUsdValue(0);
    }
  }, [amount, selectedAsset]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      {/* MAIN FORM */}
      {!showPreview && (
        <div className="absolute bg-white text-black md:rounded-lg w-full h-full md:h-auto sm:w-[600px] md:top-[30px] md:bottom-[30px] sm:rounded-xl overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <button onClick={onClose} className="flex items-center gap-1">
              <IoMdArrowBack size={20} />
              <span className="text-sm">Send</span>
            </button>
            <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center">
              <span className="text-xs">✓</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Recipient */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Recipient</label>
              <input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
              />

              <div className="flex gap-2 mt-3 text-gray-400">
                <button className="p-2 hover:bg-gray-800 rounded-lg">🔄</button>
                <button className="p-2 hover:bg-gray-800 rounded-lg">📋</button>
                <button className="p-2 hover:bg-gray-800 rounded-lg">
                  <RiUserFill />
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Amount</label>
              <div className="flex items-center bg-transparent border border-gray-700 rounded-lg overflow-hidden h-12">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-transparent px-3 text-lg focus:outline-none"
                  placeholder="0"
                />
                <button
                  onClick={() => setAssetModalOpen(true)}
                  className="flex items-center gap-1 px-3 bg-red-300 h-full text-sm border-l border-gray-700"
                >
                  <img src={selectedAsset.logo} alt={selectedAsset.name} className="w-5 h-5" />
                  <span className="truncate">{selectedAsset.name}</span> ▼
                </button>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>${usdValue.toFixed(2)}</span>
                <span>{selectedAsset.balance} Max</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 absolute bottom-0 w-full">
            <button
              onClick={() => setShowPreview(true)}
              className="w-full bg-emerald-500 hover:bg-emerald-700 cursor-pointer text-black py-3 rounded-lg font-medium"
            >
              Preview
            </button>
          </div>

          {assetModalOpen && (
            <SelectCrypto
              assets={mockAssets}
              onSelect={(asset) => {
                setSelectedAsset(asset);
                setAssetModalOpen(false);
              }}
              onClose={() => setAssetModalOpen(false)}
            />
          )}
        </div>
      )}

      {/* PREVIEW PAGE */}
      {showPreview && (
        <div className="absolute bg-white text-black md:rounded-lg w-full h-full md:h-auto sm:w-[600px] md:top-[30px] md:bottom-[30px] sm:rounded-xl overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <button onClick={() => setShowPreview(false)} className="flex items-center gap-1">
              <IoMdArrowBack size={20} />
              <span className="text-sm">Preview</span>
            </button>
          </div>

          <div className="p-4 space-y-4 text-sm">
            <div>
              <p className="text-gray-400">Network</p>
              <p>Ethereum</p>
            </div>
            <div>
              <p className="text-gray-400">Account address</p>
              <p className="break-words">{recipient}</p>
            </div>
            <div>
              <p className="text-gray-400">Asset</p>
              <p className="flex items-center gap-2">
                <img src={selectedAsset.logo} alt={selectedAsset.name} className="w-5 h-5" />
                {amount} {selectedAsset.name}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Estimated network fee</p>
              <p>0.00005171 ETH ($0.07)</p>
            </div>
          </div>

          <div className="p-4 border-t border-gray-700 absolute bottom-0 w-full">
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 border border-gray-700 py-3 rounded-lg"
              >
                Cancel
              </button>
              <button className="flex-1 bg-emerald-500 hover:bg-emerald-700 text-black py-3 rounded-lg font-medium">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
