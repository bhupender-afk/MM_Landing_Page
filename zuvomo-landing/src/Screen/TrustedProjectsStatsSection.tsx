import React from "react";
import { motion } from "framer-motion";
import useCounter from "./useCounter";
import LogoLoop from "@/components/LogoLoop";

const TrustedProjectsStatsSection: React.FC = () => {
  const [count1, setVisible1] = useCounter(500);
  const [count2, setVisible2] = useCounter(150);
  const [count3, setVisible3] = useCounter(99.9);

  const imageLogos = [
    { src: "/assets/Dexcheck (1).png", alt: "Dexcheck", href: "" },
    { src: "/assets/Fomofund (1).png", alt: "FomoFund", href: "" },
    { src: "/assets/Landshare (1).png", alt: "Landshare", href: "" },
    { src: "/assets/Morpheus (1).png", alt: "Morpheus", href: "" },
    { src: "/assets/Pencils Protocol (1).png", alt: "Pencils Protocol", href: "" },
    { src: "/assets/Vulcan (1).png", alt: "Vulcan", href: "" },
    { src: "/assets/Zebec (1).png", alt: "Zebec", href: "" },

    // Duplicate set for seamless scroll
    { src: "/assets/Dexcheck (1).png", alt: "Dexcheck", href: "" },
    { src: "/assets/Fomofund (1).png", alt: "FomoFund", href: "" },
    { src: "/assets/Landshare (1).png", alt: "Landshare", href: "" },
    { src: "/assets/Morpheus (1).png", alt: "Morpheus", href: "" },
    { src: "/assets/Pencils Protocol (1).png", alt: "Pencils Protocol", href: "" },
    { src: "/assets/Vulcan (1).png", alt: "Vulcan", href: "" },
    { src: "/assets/Zebec (1).png", alt: "Zebec", href: "" },
  ];


  return (
    <section className="bg-[#2f3a63] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            setVisible1(true);
            setVisible2(true);
            setVisible3(true);
          }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Trusted by Leading Projects
          </h2>
          <p className="text-gray-300 text-lg">
            Join 500+ successful blockchain projects that trust Zuvomo
          </p>
        </motion.div>

        {/* Project Logos */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
        >
          {[
            "LandShare",
            "Morpheus Network",
            "Pencils Protocol",
            "Vulcan Forged",
            "Zebec Protocol",
            "Onxcheck",
          ].map((project, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center justify-center"
            >
              <div className="bg-white rounded-lg w-full h-20 flex items-center justify-center">
                <span className="text-gray-800 font-bold text-xs">{project}</span>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        <div className="mb-16">
          <LogoLoop
            logos={imageLogos}
            speed={120}
            direction="left"
            logoHeight={100}
            gap={40}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            fadeOutColor="#2f3a63"
            ariaLabel="Technology partners"
          />
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          <div className="text-center">
            <motion.p
              className="text-6xl font-bold text-[#FFD700] mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              {count1}+
            </motion.p>
            <p className="text-white/80 text-lg">Projects Served</p>
          </div>

          <div className="text-center">
            <motion.p
              className="text-6xl font-bold text-[#FFD700] mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.1 }}
            >
              ${count2}M+
            </motion.p>
            <p className="text-white/80 text-lg">Volume Managed</p>
          </div>

          <div className="text-center">
            <motion.p
              className="text-6xl font-bold text-[#FFD700] mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.2 }}
            >
              {count3.toFixed(1)}%
            </motion.p>
            <p className="text-white/80 text-lg">Uptime</p>
          </div>

          <div className="text-center">
            <motion.p
              className="text-6xl font-bold text-[#FFD700] mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.3 }}
            >
              24/7
            </motion.p>
            <p className="text-white/80 text-lg">Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedProjectsStatsSection;
