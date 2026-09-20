"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import NavLink from "@/components/layout/NavLink";
import { CTA, NAV } from "@/lib/site";

export default function MobileNav() {
  const pathname = usePathname();
  // The header lives in the root layout, so this state survives navigation. Store the page the menu
  // was opened on: once the pathname changes (drawer CTA, logo, back button) it no longer matches
  // and the drawer is closed, with no effect needed to reset it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenedOn(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpenedOn(open ? null : pathname)}
        className="type-button inline-flex min-h-12 items-center gap-2 border-2 border-ink px-4 text-ink hover:bg-ink hover:text-canvas"
      >
        <Icon name={open ? "close" : "menu"} />
        {open ? "Close" : "Menu"}
      </button>
      {open ? (
        // Full-width drawer under the header. The only place a shadow is allowed: it floats over content.
        // Capped to the visible height (header is 64px here) and scrollable, so on a short landscape
        // phone the last items stay reachable instead of running off-screen behind a sticky header.
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-b border-hairline-soft bg-canvas shadow-overlay"
        >
          {/* Any tap on a link or the CTA closes the drawer, including a link to the page you are already on. */}
          <ul onClick={() => setOpenedOn(null)} className="mx-auto w-full max-w-[1264px] px-4 pb-6 pt-2 md:px-8">
            {NAV.map((l) => (
              <li key={l.href} className="border-b border-hairline-soft">
                <NavLink
                  href={l.href}
                  className="type-body-lg flex min-h-14 items-center font-semibold"
                >
                  <span>{l.label}</span>
                </NavLink>
              </li>
            ))}
            <li className="pt-6">
              <Button href={CTA.primaryHref} className="w-full">
                {CTA.primary}
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
