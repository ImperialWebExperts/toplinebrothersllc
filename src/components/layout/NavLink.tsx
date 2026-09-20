"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Client component only because it needs the current pathname to mark the active page
 * (aria-current plus a 2px underline, so the state is never carried by color alone).
 * Everything else in the header stays a Server Component.
 */
export default function NavLink({
  href,
  className = "",
  onClick,
  children,
}: {
  href: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`decoration-2 underline-offset-[6px] hover:underline aria-[current=page]:underline ${className}`}
    >
      {children}
    </Link>
  );
}
