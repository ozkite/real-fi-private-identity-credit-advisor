"use client";

import Image from "next/image";
import type React from "react";

interface SidebarIconProps {
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarIcon: React.FC<SidebarIconProps> = ({ isCollapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
      type="button"
    >
      <Image
        src="/img/black_sidebar.svg"
        alt="nilGPT Logo"
        width={24}
        height={24}
      />
    </button>
  );
};

export default SidebarIcon;
