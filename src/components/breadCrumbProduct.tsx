"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbProps = {
  lastLabel?: string;
};

export default function BreadcrumbProduct({ lastLabel }: BreadcrumbProps) {
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
                <span className="text-gray-500 capitalize">
                  {lastLabel ?? segment}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-blue-600 hover:underline capitalize"
                >
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
