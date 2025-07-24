import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ipfs.io", // ← публичный IPFS гейтвей
      "ipfscdn.io", // ← разрешит ВСЕ clientId от Thirdweb (любой поддомен)
      "nftstorage.link", // ← (опционально) если вдруг где-то используешь
    ],
  },
};

export default nextConfig;
