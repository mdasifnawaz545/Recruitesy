import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-full w-full">
      <div className="animate-spin rounded-full h-9 w-9 border-[3px] border-gray-700 border-t-slate-300"></div>
    </div>
  );
};

export default LoadingSpinner;
