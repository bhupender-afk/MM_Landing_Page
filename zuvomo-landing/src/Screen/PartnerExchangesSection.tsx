import LogoLoop from "@/components/LogoLoop";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

interface ExchangeItem {
  name: string;
  color: string;
}

const PartnerExchangesSection: React.FC = () => {
  const exchanges: ExchangeItem[] = [
    { name: "Exchange 1", color: "#3B82F6" },
    { name: "KuCoin", color: "#2DCEAA" },
    { name: "Uniswap", color: "#FF007A" },
    { name: "Curve", color: "#4169E1" },
    { name: "Exchange 5", color: "#000" },
    { name: "Exchange 6", color: "#5A9FD4" },
    { name: "Exchange 7", color: "#7C83A5" },
  ];

  const imageLogos = [
    { src: "/assets/Bybit.png", alt: "Bybit", href: "" },
    { src: "/assets/GATE.png", alt: "Gate.io", href: "" },
    { src: "/assets/KUCOIN 3.png", alt: "KuCoin", href: "" },
    { src: "/assets/UNISWAP.png", alt: "Uniswap", href: "" },
    { src: "/assets/bitget.png", alt: "Bitget", href: "" },
    { src: "/assets/bitmart.png", alt: "Bitmart", href: "" },
    { src: "/assets/mexc.png", alt: "MEXC", href: "" },
    { src: "/assets/pool.png", alt: "Pool", href: "" },

    // Duplicate set for seamless loop
    { src: "/assets/Bybit.png", alt: "Bybit", href: "" },
    { src: "/assets/GATE.png", alt: "Gate.io", href: "" },
    { src: "/assets/KUCOIN 3.png", alt: "KuCoin", href: "" },
    { src: "/assets/UNISWAP.png", alt: "Uniswap", href: "" },
    { src: "/assets/bitget.png", alt: "Bitget", href: "" },
    { src: "/assets/bitmart.png", alt: "Bitmart", href: "" },
    { src: "/assets/mexc.png", alt: "MEXC", href: "" },
    { src: "/assets/pool.png", alt: "Pool", href: "" },
  ];


  return (
    <section className="bg-[#2f3a63] py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl font-bold text-white text-center mb-12"
        >
          PARTNER EXCHANGES
        </motion.h2>

        {/* Infinite Scrolling Container */}
        {/* <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 10,
                ease: "linear",
              },
            }}
            className="flex gap-6 w-max"
          >
            {[...imageLogos, ...imageLogos,  ...imageLogos,  ...imageLogos,  ...imageLogos,  ...imageLogos].map((exchange, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex-shrink-0 w-40 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  <Image
                    src={exchange.src}
                    alt={exchange.alt}
                    width={120}
                    height={40}
                    className="h-12 w-auto"
                    priority
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div> */}
        <LogoLoop
        logos={imageLogos}
        speed={120}
        direction="left"
        logoHeight={80}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#2f3a63"
        ariaLabel="Technology partners"
      />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/80 text-center mt-8 text-xl font-semibold"
        >
          AND 100+ MORE
        </motion.p>
      </div>
    </section>
  );
};

export default PartnerExchangesSection;