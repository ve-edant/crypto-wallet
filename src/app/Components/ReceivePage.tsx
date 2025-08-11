import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

type ReceivePageProps = {
  setShowQrModal: (value: boolean) => void;
};

const walletAddresses = [
  { name: "Bitcoin", address: "141LxgUA8TWQDbRPGqCx26pCJKuR7yg3pj" },
  { name: "Ethereum", address: "0x94e2233871d9e2c86cdf3330435230a57fe3770b" },
  { name: "Doge Coin", address: "DJxkCjHpgj7c2bTgB5WELiaTDKuKxHUHVz" },
  { name: "Trx Tron", address: "TQwJZfe7vjLq36mBS2JrURPz8UfTiciFGk" },
  { name: "USDT", address: "0x94e2233871d9e2c86cdf3330435230a57fe3770b" },
];

const ReceivePage = ({ setShowQrModal }: ReceivePageProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="absolute bg-white text-black flex flex-col md:rounded-lg w-full h-full md:h-auto sm:w-[500px] md:top-[30px] md:bottom-[30px] sm:rounded-xl overflow-y-auto p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Receive Funds</h2>
          <button
            onClick={() => setShowQrModal(false)}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
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
      </div>
    </div>
  );
};

export default ReceivePage;
