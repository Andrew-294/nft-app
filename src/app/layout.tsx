import { Sidebar } from "@/components/sidebar/Sidebar";
import "./globals.css";
import { Footer } from "@/components/footer/Footer";

export const metadata = {
  title: "Mint NFT",
  description: "Thirdweb Mint Demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
