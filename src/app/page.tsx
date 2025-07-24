"use client";

import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { Sepolia } from "@thirdweb-dev/chains";
import { NFTData } from "@/types/types";
import ImageWithLoader from "@/components/loader/ImageWithLoader";
import Image from "next/image";

function shortDescription(description: string) {
  if (description.length > 87) {
    return description.slice(0, 87) + "...";
  }
  return description;
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);
  const [contractAddress, setContractAddress] = useState("");
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    async function fetchConfig() {
      const res = await fetch("/api/config");
      const json = await res.json();
      setContractAddress(json.contractAddress);
      setClientId(json.clientId);
    }

    fetchConfig();
  }, []);

  useEffect(() => {
    async function loadNFTs() {
      // ✅ Защита от пустого или невалидного адреса
      if (
        !contractAddress ||
        typeof contractAddress !== "string" ||
        contractAddress.length !== 42 ||
        !contractAddress.startsWith("0x")
      ) {
        console.warn("⛔ Невалидный contractAddress:", contractAddress);
        return;
      }

      if (!clientId) {
        console.warn("⛔ clientId отсутствует");
        return;
      }

      const sdk = new ThirdwebSDK(Sepolia, { clientId });

      try {
        const contract = await sdk.getContract(contractAddress, "nft-drop");

        const claimedCount = (await contract.totalClaimedSupply()).toNumber();
        const totalCount = (await contract.totalSupply()).toNumber();

        const list: NFTData[] = [];

        for (let id = 0; id < totalCount; id++) {
          try {
            const metadata = await contract.get(id);
            const rawImage = metadata?.metadata?.image ?? "";

            const image = rawImage.startsWith("ipfs://")
              ? `https://${clientId}.ipfscdn.io/ipfs/${rawImage.replace("ipfs://", "")}`
              : rawImage;

            list.push({
              id,
              name: String(metadata.metadata.name ?? `NFT #${id}`),
              description: metadata.metadata.description || "",
              image,
              sold: id < claimedCount,
            });
          } catch (err) {
            console.warn(`⚠️ Ошибка загрузки NFT ${id}:`, err);
          }
        }

        // ✅ Сначала непроданные, потом проданные
        list.sort((a, b) => Number(a.sold) - Number(b.sold));

        setNfts(list);
      } catch (err) {
        console.error("❌ Ошибка инициализации контракта:", err);
      } finally {
        setLoading(false);
      }
    }

    loadNFTs();
  }, [contractAddress, clientId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
        🐋 WHALES NFT-Gallery
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[...nfts]
          .sort((a, b) => Number(a.sold) - Number(b.sold)) // SOLD в конец
          .map((nft) => (
            <div
              key={nft.id}
              onClick={() => setSelectedNFT(nft)}
              className={`fade-in relative bg-gradient-to-br from-purple-800 to-pink-500 p-[2px] rounded-2xl shadow-lg z-0 cursor-pointer hover:scale-[1.02] transition ${
                nft.sold ? "opacity-40 grayscale pointer-events-none" : ""
              }`}
            >
              <div className="bg-black rounded-2xl p-4 h-full flex flex-col">
                <ImageWithLoader
                  src={`/api/ipfs?src=${encodeURIComponent(nft.image)}`}
                  alt={nft.name}
                />

                <h3 className="text-lg font-semibold mb-1">{nft.name}</h3>
                <p className="text-sm text-neutral-400">
                  {shortDescription(nft.description)}
                </p>
              </div>

              {nft.sold && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                  SOLD
                </div>
              )}
            </div>
          ))}
      </div>
      {selectedNFT && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/90 bg-opacity-70">
          <div className="fade-in-modal relative bg-gradient-to-br from-purple-900 to-black p-[2px] rounded-2xl shadow-2xl max-w-lg w-full mx-4">
            <div className="bg-black p-5 rounded-2xl text-white">
              <button
                onClick={() => setSelectedNFT(null)}
                className="absolute top-3 right-3 text-white hover:text-pink-500 transition text-xl"
                aria-label="Close modal"
              >
                ✖
              </button>
              <div className="flex justify-center mb-4">
                <img
                  src={selectedNFT.image}
                  alt={selectedNFT.name}
                  className="w-auto h-64 max-w-full rounded-xl border border-purple-800 shadow-md"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">
                {selectedNFT.name}
              </h2>
              <p className="text-base text-neutral-200 text-left leading-7 tracking-wide bg-neutral-900 bg-opacity-40 p-4 rounded-xl shadow-inner max-w-[90%] mx-auto">
                {selectedNFT.description}
              </p>
              {!selectedNFT.sold && (
                <div className="mt-6 text-center">
                  <a
                    href={`https://thirdweb.com/sepolia/${contractAddress}/nfts/${selectedNFT.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex justify-center items-center px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-105 transition transform shadow-lg"
                  >
                    <Image
                      src={"/cart.png"}
                      alt="Cart"
                      width={20}
                      height={20}
                    />
                    <span className="ml-2">Mint on Thirdweb</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
