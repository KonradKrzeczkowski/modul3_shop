"use client"
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  
  return (
    <header className="md:px-[40px] px-2 pt-[32px] pb-0 bg-[var(--color-bg)]">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Image
            src="/home/nexushub.svg"
            alt="NexusHub Logo"
            width={200}
            height={46}
            className="object-contain"
          />
        </div>

        <div className="md:flex items-center gap-4" >
          <Link href="/cart/me"><Image
            src="/Cart/cart/shape-1.svg"
            alt="Cart"
            width={32}
            height={32}
            className="object-contain cursor-pointer"
          /></Link>
         <Link href="/profile"> <Image
            src="/home/Account.svg"
            alt="User Avatar"
            width={32}
            height={32}
            className="object-contain cursor-pointer rounded-full"
          /></Link>
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
