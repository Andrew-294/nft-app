"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewContractPage() {
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState("");
  const [clientId, setClientId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    const res = await fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        clientId,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Ошибка обновления данных");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/"), 1000); // ⏳ чуть позже редирект
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center text-pink-400">
          🛠 Установить контракт
        </h1>

        <input
          className="w-full p-2 mb-3 rounded bg-neutral-800 text-white placeholder-gray-400"
          placeholder="Contract address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <input
          className="w-full p-2 mb-3 rounded bg-neutral-800 text-white placeholder-gray-400"
          placeholder="Thirdweb Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-2 mb-3 rounded bg-neutral-800 text-white placeholder-gray-400"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm mb-2">✅ Сохранено успешно!</p>
        )}

        <button
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded hover:scale-105 transition"
          onClick={handleSave}
        >
          💾 Сохранить и открыть галерею
        </button>
      </div>
    </div>
  );
}
