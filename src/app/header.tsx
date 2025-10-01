"use client";
import Link from "next/link";
import Account from "@/components/icons/account";
import NexusHub from "@/components/icons/nexusHub";
import Cart from "@/components/icons/cart";
export default function Header() {
  return (
    <header className="md:px-[40px] px-2 pt-[32px] pb-0 bg-[var(--color-bg)]">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
        <NexusHub/>
        </div>

        <div className="md:flex items-center gap-4">
          <Link href="/cart/me">
            <Cart/>
          </Link>
          <Link href="/profile">
          <Account/>
          </Link>
        </div>
      </div>

      <nav className="mt-10 flex gap-8 text-[var(--color-text)] font-medium text-sm sm:text-base">
        <Link
          href="/"
          className="hover:text-[var(--color-neutral-500)] transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/product"
          className="hover:text-[var(--color-neutral-500)] transition-colors duration-200"
        >
          Product
        </Link>
      </nav>

      <div className="mt-[40px] border-t border-[var(--color-gray-200)]"></div>

      <div className="mt-[32px]"></div>
    </header>
  );
}
