import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiEye, FiFlag, FiTrash2 } from "react-icons/fi";

export function ActionsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close menu if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-1 rounded hover:bg-gray-100"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Open actions menu"
      >
        <FiMoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm w-full hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              alert("View clicked");
            }}
          >
            <FiEye /> View
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpen(false);
              alert("Flag clicked");
            }}
          >
            <FiFlag /> Flag
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 text-sm w-full text-red-600 hover:bg-red-50"
            onClick={() => {
              setOpen(false);
              alert("Delete clicked");
            }}
          >
            <FiTrash2 /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
