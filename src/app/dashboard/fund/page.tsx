"use client"

import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";


const walletAddresses = [
  { name: "Bitcoin", address: "141LxgUA8TWQDbRPGqCx26pCJKuR7yg3pj" },
  { name: "Ethereum", address: "0x94e2233871d9e2c86cdf3330435230a57fe3770b" },
  { name: "Doge Coin", address: "DJxkCjHpgj7c2bTgB5WELiaTDKuKxHUHVz" },
  { name: "Trx Tron", address: "TQwJZfe7vjLq36mBS2JrURPz8UfTiciFGk" },
  { name: "USDT", address: "0x94e2233871d9e2c86cdf3330435230a57fe3770b" },
];

const FundPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <div className="bg-white text-black flex flex-col md:rounded-lg w-full h-full sm:rounded-xl overflow-y-auto p-4">

        {/* Accordion List */}
        <div className="space-y-3 flex-grow overflow-auto">
          {walletAddresses.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left"
              >
                <span className="font-medium">{item.name}</span>
                <FaAngleDown
                  className={`text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {/* Accordion Content */}
              {openIndex === index && (
                <div className="p-4 flex flex-col items-center">
                  <QRCodeSVG
                    value={item.address}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="Q"
                  />
                  <p className="text-sm mt-4 break-all text-center">
                    {item.address}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Send Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
            onClick={() => alert("Send action triggered")}
          >
            Send
          </button>
        </div>
      </div>
  );
};

export default FundPage;
