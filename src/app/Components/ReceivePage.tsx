import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";

type ReceivePageProps = {
  setShowQrModal: (value: boolean) => void;
};

const ReceivePage = ({ setShowQrModal }: ReceivePageProps) => {
  const [addressInput, setAddressInput] = useState("");
  const [addresses, setAddresses] = useState<string[]>([]);

  const addAddress = () => {
    if (addressInput.trim() && !addresses.includes(addressInput.trim())) {
      setAddresses([...addresses, addressInput.trim()]);
      setAddressInput("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="absolute bg-white text-black flex flex-col md:rounded-lg w-full h-full md:h-auto sm:w-[600px] md:top-[30px] md:bottom-[30px] sm:rounded-xl overflow-y-auto p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Receive Funds</h2>
          <button onClick={() => setShowQrModal(false)} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            placeholder="Enter wallet address"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={addAddress}
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
          >
            Add
          </button>
        </div>

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="space-y-6">
            {addresses.map((addr, idx) => (
              <div key={idx} className="flex flex-col items-center border border-gray-200 rounded-lg p-4">
                <QRCodeSVG
                  value={addr}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                />
                <p className="text-sm mt-4 break-all text-center">{addr}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center mt-8">
            No addresses yet. Add one above to generate a QR code.
          </p>
        )}
      </div>
    </div>
  );
};

export default ReceivePage;
