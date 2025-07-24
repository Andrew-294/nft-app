"use client";

import { SIDEBAR_LINKS } from "@/data/data";
import Link from "next/link";

type Props = {
  setIsOpened: (open: boolean) => void;
};

export function LinksMapSidebar({ setIsOpened }: Props) {
  return (
    <nav className="flex flex-col space-y-4 px-6 pt-6">
      {SIDEBAR_LINKS.map((link) => (
        <Link
          href={link.link}
          onClick={() => setIsOpened(false)}
          className="hover:text-pink-400 transition"
          key={link.name}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
