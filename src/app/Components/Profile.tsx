"use client";

import { useSession, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return (
      <div>
        <button
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          onClick={() => (window.location.href = "/auth/login")}
        >
          Login
        </button>
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="relative inline-block w-full max-w-xs">
      <div className="flex items-center justify-between gap-3 p-2 bg-white border border-zinc-300 rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <div className="flex items-center gap-1">
          <img
            src={user?.image || "/default-avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex flex-col text-[13px] text-left">
            <span className="font-semibold text-gray-900">
              {user?.name || "User"}
            </span>
            <span className="text-[10px] text-gray-500 truncate block">{user?.email}</span>
          </div>
        </div>
        <button
              onClick={() => signOut()}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white p-1 rounded hover:bg-black transition"
            >
              <FiLogOut size={20} />
            </button>
      </div>
    </div>
  );
}
