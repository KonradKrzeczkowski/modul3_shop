"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname(); 
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>

        {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={idx} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-500 capitalize">{segment}</span>
              ) : (
                <Link href={href} className="text-blue-600 hover:underline capitalize">
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}