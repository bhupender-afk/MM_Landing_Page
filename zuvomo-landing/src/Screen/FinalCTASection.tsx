import { motion } from "framer-motion";
import React from "react";

const FinalCTASection: React.FC = () => {
  return (
    <section className="bg-[#2f3a63] py-24 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-6"
        >
          Ready to Transform Your Token's Market Performance?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-300 text-xl mb-10"
        >
          Join 500+ successful projects that chose Zuvomo for professional market making
        </motion.p>

        <motion.a
          href="mailto:contact@zuvomo.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block bg-[#2B91D6] text-white px-16 py-5 rounded-full text-xl font-semibold shadow-xl hover:bg-[#2380c0] transition-colors"
        >
          Contact Us Today
        </motion.a>
      </motion.div>
    </section>
  );
};

export default FinalCTASection;
