"use client";

import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import DesktopDashboardNav from "./DesktopDashboardNav";
import MobileDashboardNav from "./MobileDashboardNav";
import { api } from "@/trpc/react";

export default function DashboardNavigation() {
  const cartItems = api.cart.getCartItem.useQuery().data;
  const RenderCartButton = () => (
    <>
      {(cartItems?.length ?? 0 > 0) ? (
        <Link href="/dashboard/cart">
          <button className="relative">
            <FaBasketShopping size={25} />
            <span className="absolute -right-5 -top-4">
              {(cartItems?.length ?? 0 > 0) ? (
                <span className="rounded-full bg-primary px-2.5 py-1.5 text-xs text-white">
                  {cartItems?.length}
                </span>
              ) : (
                ""
              )}
            </span>
          </button>
        </Link>
      ) : (
        ""
      )}
    </>
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
