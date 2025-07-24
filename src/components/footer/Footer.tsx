import { FooterLinks } from "./footer-links";

export function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          WHALES NFT-Gallery — a collection of unique whales. Mint and become a
          part of the game.
        </span>
        <FooterLinks />
      </div>
    </footer>
  );
}
