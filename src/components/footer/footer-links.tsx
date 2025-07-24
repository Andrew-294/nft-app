import { FOOTERLINKS } from "@/data/data";
import Link from "next/link";

export function FooterLinks() {
  return (
    <>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 ">
        {FOOTERLINKS.map((link) => (
          <li key={link.name}>
            <Link
              href={link.link}
              className="hover:underline me-4 md:me-6"
              target="_blank"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
