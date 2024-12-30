import React from "react";

export const Sidebar: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={`bg-blue-100 p-4 ${className}`}>sidebar</div>;
};
