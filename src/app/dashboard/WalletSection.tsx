"use client";

import { useState } from "react";
import { MdCallReceived } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";
import { RiArrowLeftRightFill } from "react-icons/ri";
import { PiBankFill } from "react-icons/pi";
import Image from "next/image";
import SendPage from "../Components/SendPage";

const actions = [
  { label: "Send", icon: <IoArrowUp size={20} /> },
  { label: "Receive", icon: <MdCallReceived size={20} /> },
  { label: "Swap", icon: <RiArrowLeftRightFill size={20} /> },
  { label: "Sell", icon: <PiBankFill size={20} /> },
];

export default function WalletSection() {
  const [showSend, setShowSend] = useState(false);

  return (
    <div className="p-6 overflow-hidden">
      {/* Balance */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">$0.00</h1>
        <p className="text-sm text-gray-500">Total Balance</p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6 text-center sm:flex sm:justify-between">
        {actions.map(({ label, icon }) => (
          <div
            key={label}
            onClick={() => label === "Send" && setShowSend(true)}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-400 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
              {icon}
            </div>
            <p className="text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Portfolio */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Assets</h2>
        <p className="text-gray-500">No assets yet</p>
      </div>

      {/* Send Modal */}
      {showSend && <SendPage onClose={() => setShowSend(false)} />}
    </div>
  );
}
