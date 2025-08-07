// src/app/Components/Wallet/WalletSection.tsx

import { MdCallReceived } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";

const actions = [
  { label: "Send", icon: <IoArrowUp size={20} /> },
  { label: "Receive", icon: <MdCallReceived size={20} /> },
  { label: "Swap", icon: <RiArrowLeftRightFill size={20} /> },
  { label: "Sell", icon: <PiBankFill size={20} /> },
];

export default function WalletSection() {
  return (
    <div className="p-6 overflow-hidden sticky top-0">
      {/* Balance */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">$0.00</h1>
        <p className="text-sm text-gray-500">Total Balance</p>
      </div>

      {/* Actions */}
      <div className="flex justify-between gap-4 mb-6 text-center">
        {actions.map(({ label, icon }) => (
          <div
            key={label}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full bg-[#48ff93] flex items-center justify-center mb-1">
              {icon}
            </div>
            <p className="text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Portfolio */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Assets</h2>
        {/* Use same CoinCard or similar */}
        <p className="text-gray-500">No assets yet</p>
      </div>
    </div>
  );
}
