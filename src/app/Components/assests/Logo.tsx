import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { updateCompanyDetails } from "@/app/store/invoiceSlice";
import { RootState } from "@/app/store/store";
import React from "react";

const Logo = () => {
  const dispatch = useAppDispatch();
  const companyDetails = useAppSelector(
    (state: RootState) => state.invoice.CompanyDetails
  );

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    const field = "companyLogo";
    if (!image) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        updateCompanyDetails({
          ...companyDetails,
          [field]: reader.result as string,
        })
      );
    };

    reader.readAsDataURL(image)
  };
  return (
    <div>
      <div>
        <div>Saved Logos</div>
        <div>Manage the logos that are stored on your Account.</div>
      </div>
      <div>
        <div className="relative w-[180px] aspect-square border border-gray-300 rounded-md overflow-hidden bg-gray-50">
          <input
            type="file"
            accept="image/*"
            id="company-logo"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => handleLogo(e)}
          />
          {companyDetails.companyLogo ? (
            <>
              <img
                src={companyDetails.companyLogo}
                alt="Company Logo"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
              />
              <button
                type="button"
                className="absolute top-1 right-1 z-20 bg-white border border-gray-300 text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition"
                title="Remove"
              >
                &times;
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-sm text-gray-500 z-0">
              Upload
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Logo;
