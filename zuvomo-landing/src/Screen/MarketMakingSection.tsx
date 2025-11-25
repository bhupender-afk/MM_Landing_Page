import { motion } from "framer-motion";
import React from "react";

interface OrderBookItem {
  price: number;
  amount: number;
  total: number;
  type: "buy" | "sell";
}

const MarketMakingSection: React.FC = () => {
  const orderBookDataWithout: OrderBookItem[] = [
    { price: 1.2457, amount: 46, total: 857, type: "sell" },
    { price: 1.2440, amount: 0, total: 0, type: "sell" },
    { price: 1.2420, amount: 0, total: 0, type: "sell" },
    { price: 1.2160, amount: 0, total: 852, type: "buy" },
    { price: 1.2160, amount: 0, total: 0, type: "buy" },
    { price: 1.2140, amount: 0, total: 0, type: "buy" },
    { price: 1.2130, amount: 400, total: 0, type: "buy" },
  ];

  const orderBookDataWith: OrderBookItem[] = [
    { price: 1.2235, amount: 17865, total: 21000, type: "sell" },
    { price: 1.2234, amount: 16641, total: 20000, type: "sell" },
    { price: 1.2233, amount: 12306, total: 15000, type: "sell" },
    { price: 1.2231, amount: 11250, total: 16000, type: "buy" },
    { price: 1.2230, amount: 18900, total: 23100, type: "buy" },
    { price: 1.2229, amount: 14580, total: 17800, type: "buy" },
    { price: 1.2228, amount: 22400, total: 27000, type: "buy" },
  ];

  return (
    <section className="bg-[#2f3a63] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#2B91D6] text-sm font-semibold mb-2 uppercase tracking-wide">
            The Challenge & Solution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            See the Dramatic Difference
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            The stark reality of market making - Your choice determines your token's fate.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12 relative">
          {/* Without Zuvomo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-red-700 to-red-700 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              WITHOUT ZUVOMO
            </h3>

            <div className="bg-red-800/40 rounded-xl p-4 mb-6">
              <p className="text-center text-white/90 font-semibold mb-4">
                Poor Liquidity Management
              </p>

              {/* Order Book */}
              <div className="bg-red-950/60 rounded-lg p-4 mb-4">
                <p className="text-white/80 text-sm mb-2 font-mono">Low Liquidity</p>
                <div className="space-y-1 text-xs font-mono text-white/60">
                  <div className="flex justify-between">
                    <span>ASKS (SELLING)</span>
                  </div>

                  {orderBookDataWithout.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex justify-between opacity-50">
                      <span>{item.price}</span>
                      <span>{item.amount || "---"}</span>
                      <span>{item.total || "---"}</span>
                    </div>
                  ))}

                  <div className="flex justify-center py-2">
                    <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold text-sm">
                      SPREAD: 2.0%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>BIDS (BUYING)</span>
                  </div>

                  {orderBookDataWithout.slice(3).map((item, i) => (
                    <div key={i} className="flex justify-between opacity-50">
                      <span>{item.price}</span>
                      <span>{item.amount || "---"}</span>
                      <span>{item.total || "---"}</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-white/60 text-xs mt-3">
                  Limited Market Activity
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-red-800/40 rounded-xl p-6 mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-4xl font-bold text-white">3.2%</p>
                  <p className="text-white/70 text-sm mt-1">SPREAD</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">15.8%</p>
                  <p className="text-white/70 text-sm mt-1">SLIPPAGE</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">800</p>
                  <p className="text-white/70 text-sm mt-1">VOLUME</p>
                </div>
              </div>
            </div>

            <p className="text-white/90 text-center text-sm">
              High spreads and low liquidity lead to poor trading experience and
              reduced investor confidence.
            </p>
          </motion.div>

          {/* With Zuvomo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-linear-to-br from-emerald-700 to-emerald-700 rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              WITH ZUVOMO
            </h3>

            <div className="bg-emerald-800/40 rounded-xl p-4 mb-6">
              <p className="text-center text-white/90 font-semibold mb-4">
                Professional Market Making
              </p>

              {/* Order Book */}
              <div className="bg-emerald-950/60 rounded-lg p-4 mb-4">
                <p className="text-white/80 text-sm mb-2 font-mono">Deep Liquidity Pool</p>

                <div className="space-y-1 text-xs font-mono text-white/60">
                  <div className="flex justify-between">
                    <span>ASKS (SELLING)</span>
                  </div>

                  {orderBookDataWith.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex justify-between text-emerald-300">
                      <span>{item.price}</span>
                      <span>{item.amount.toLocaleString()}</span>
                      <span>${(item.total / 1000).toFixed(1)}K</span>
                    </div>
                  ))}

                  <div className="flex justify-center py-2">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full font-bold text-sm">
                      SPREAD: 0.01%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>BIDS (BUYING)</span>
                  </div>

                  {orderBookDataWith.slice(3).map((item, i) => (
                    <div key={i} className="flex justify-between text-emerald-300">
                      <span>{item.price}</span>
                      <span>{item.amount.toLocaleString()}</span>
                      <span>${(item.total / 1000).toFixed(1)}K</span>
                    </div>
                  ))}
                </div>

                <p className="text-center text-white/80 text-xs mt-3">
                  AI-Powered 24/7 Trading
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-emerald-800/40 rounded-xl p-6 mb-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-4xl font-bold text-white">0.08%</p>
                  <p className="text-white/70 text-sm mt-1">SPREAD</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">0.2%</p>
                  <p className="text-white/70 text-sm mt-1">SLIPPAGE</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-white">85K</p>
                  <p className="text-white/70 text-sm mt-1">VOLUME</p>
                </div>
              </div>
            </div>

            <p className="text-white/90 text-center text-sm">
              Tight spreads and deep liquidity ensure smooth trading and attract
              serious investors to your token.
            </p>
          </motion.div>

          {/* VS Badge - Desktop Only */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-[#2B91D6] text-white rounded-full w-20 h-20 flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-white"
            >
              VS
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Token's Liquidity?
          </h3>
          <p className="text-gray-300 mb-8">
            Join 500+ successful projects that chose Zuvomo for professional market making
          </p>

          <motion.a
            href="mailto:contact@zuvomo.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#2B91D6] text-white px-12 py-4 rounded-full text-lg font-semibold shadow-xl hover:bg-[#2380c0] transition-colors"
          >
            Contact Us Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketMakingSection;
