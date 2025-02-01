"use client";

import Link from "next/link";
import { FaBasketShopping } from "react-icons/fa6";
import DesktopDashboardNav from "./DesktopDashboardNav";
import MobileDashboardNav from "./MobileDashboardNav";
import { fetchCartItems } from "@/hooks/cart";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function DashboardNavigation() {
  const { data: session } = useSession();

  // Use query to fetch cart data
  const { data: cartItems } = useQuery({
    queryKey: ["cart", session?.user.id],
    queryFn: () => fetchCartItems(session!.user.id),
  });

  const RenderCartButton = () => (
    <>
      {cartItems && cartItems.length > 0 && (
        <Link href="/dashboard/cart">
          <button className="relative">
            <FaBasketShopping size={25} />
            <span className="absolute -right-5 -top-4">
              <span className="rounded-full bg-primary px-2.5 py-1.5 text-xs text-white">
                {cartItems.length}
              </span>
            </span>
          </button>
        </Link>
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
