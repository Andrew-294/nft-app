"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function Sidebar() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpened(true)}
        className="fixed top-4 left-4 z-50 text-white hover:text-pink-400 transition"
      >
        <Menu size={28} />
      </button>

      {isOpened && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setIsOpened(false)}
        />
      )}

      {/* Боковая панель */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-neutral-900 text-white shadow-lg transform transition-transform duration-300 ${
          isOpened ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Кнопка закрытия */}
        <div className="flex justify-between items-center px-4 py-4 border-b border-neutral-700">
          <h2 className="text-lg font-bold text-pink-400">Меню</h2>
          <button
            onClick={() => setIsOpened(false)}
            className="hover:text-red-400 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Ссылки */}
        <nav className="flex flex-col space-y-4 px-6 pt-6">
          <Link
            href="/"
            onClick={() => setIsOpened(false)}
            className="hover:text-pink-400 transition"
          >
            🖼 Галерея
          </Link>
          <Link
            href="/newcontract"
            onClick={() => setIsOpened(false)}
            className="hover:text-purple-400 transition"
          >
            🛠 Установить контракт
          </Link>
        </nav>
      </div>
    </>
  );
}
