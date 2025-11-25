import { motion } from "framer-motion";
import useCounter from "./useCounter";
import React from "react";

const EngagementSection: React.FC = () => {
  const [count1, setVisible1] = useCounter(500);
  const [count2, setVisible2] = useCounter(100);

  return (
    <section className=" py-20 px-4 bg-gradient-to-br from-[#2f3a63] via-[#2f3a63]/98 to-[#2f3a63]" >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => {
            setVisible1(true);
            setVisible2(true);
          }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Stat 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <motion.h3
              className="text-6xl font-bold text-[#2B91D6] mb-4"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1 }}
            >
              {count1}+
            </motion.h3>
            <h4 className="text-2xl font-semibold text-black mb-2">
              Clients Served
            </h4>
            <p className="text-gray-600">
              Engaged in collaboration with more than 500 digital asset issuers.
            </p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <motion.h3
              className="text-6xl font-bold text-[#f8673c] mb-4"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.1 }}
            >
              {count2}+
            </motion.h3>
            <h4 className="text-2xl font-semibold text-black mb-2">
              Exchanges
            </h4>
            <p className="text-gray-600">
              Currently operational and actively trading on a diverse network
              of exchanges.
            </p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center"
          >
            <motion.h3
              className="text-6xl font-bold text-[#2B91D6] mb-4"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 1, delay: 0.2 }}
            >
              24/7
            </motion.h3>
            <h4 className="text-2xl font-semibold text-black mb-2">
              Coverage
            </h4>
            <p className="text-gray-600">
              Global market coverage across all exchanges, ensuring
              round-the-clock availability.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngagementSection;
