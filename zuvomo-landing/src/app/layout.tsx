import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-ubuntu',
});

export const metadata: Metadata = {
  title: "Zuvomo | Professional Market Making Services",
  description: "Advanced algorithmic trading solutions and liquidity provision across centralized and decentralized exchanges. Professional market making services that enhance market depth and reduce spreads for optimal price discovery.",
  keywords: ["market making", "algorithmic trading", "liquidity provision", "cryptocurrency", "DeFi", "trading", "financial services"],
  authors: [{ name: "Zuvomo Team" }],
  creator: "Zuvomo",
  publisher: "Zuvomo",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zuvomo.com",
    title: "Zuvomo | Professional Market Making Services",
    description: "Advanced algorithmic trading solutions and liquidity provision across centralized and decentralized exchanges.",
    siteName: "Zuvomo",
    images: [
      {
        url: "/assets/zuvomo_01.png",
        width: 1200,
        height: 630,
        alt: "Zuvomo - Professional Market Making Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zuvomo | Professional Market Making Services",
    description: "Advanced algorithmic trading solutions and liquidity provision across centralized and decentralized exchanges.",
    images: ["/assets/zuvomo_01.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
