"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import DesktopDashboardNav from "./DesktopDashboardNav";
import MobileDashboardNav from "./MobileDashboardNav";

export default function DashboardNavigation() {
  const cartTotalQuantity = 0;

  const RenderCartButton = () => (
    <Link href="/dashboard/cart">
      <button className="relative">
        <FaBasketShopping size={25} />
        <span className="absolute -right-5 -top-4">
          {cartTotalQuantity > 0 ? (
            <span className="rounded-full bg-primary px-2.5 py-1.5 text-xs text-white">
              {cartTotalQuantity}
            </span>
          ) : (
            ""
          )}
        </span>
      </button>
    </Link>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <DesktopDashboardNav RenderCartButton={RenderCartButton} />
      {/* Mobile Navigation */}
      <MobileDashboardNav RenderCartButton={RenderCartButton} />
    </>
  );
}
