import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import React from 'react';

interface Feature {
  name: string;
  zuvomo: string;
  others: string;
  zuvomoIcon: boolean;
}

const ComparisonTableSection: React.FC = () => {
  const features: Feature[] = [
    {
      name: 'Multi-Exchange Support',
      zuvomo: 'Yes (CEX + DEX)',
      others: 'Limited or single exchange',
      zuvomoIcon: true,
    },
    {
      name: 'Advanced Algorithms & AI Integration',
      zuvomo: 'Smart trading algorithms',
      others: 'Mostly manual or outdated systems',
      zuvomoIcon: true,
    },
    {
      name: 'Onboarding & Reporting Dashboard',
      zuvomo: 'Provide with analytics',
      others: 'Basic or no dashboard',
      zuvomoIcon: true,
    },
    {
      name: 'Flexible Contract Terms',
      zuvomo: 'Short/long-term options',
      others: 'Rigid contracts',
      zuvomoIcon: true,
    },
    {
      name: 'Liquidity Pool Optimization',
      zuvomo: 'Yes',
      others: 'Not included',
      zuvomoIcon: true,
    },
    {
      name: 'Reputation & Compliance Focus',
      zuvomo: 'Maintains clean trading record',
      others: 'Involved in grey practices',
      zuvomoIcon: true,
    },
    {
      name: 'Real-Time Monitoring & Adjustments',
      zuvomo: 'Dynamic adjustments based on market conditions',
      others: 'Static and delayed responses',
      zuvomoIcon: true,
    },
    {
      name: 'Integration with Tokenomics',
      zuvomo: 'Aligned with token supply & goals',
      others: 'Often unaligned with project needs',
      zuvomoIcon: true,
    },
  ];

  

  return (
    <section className="bg-[#F6F7FA] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-black mb-4">
            Why Choose ZUVOMO
          </h2>
          <p className="text-gray-600 text-lg">
            See how ZUVOMO outperforms other market makers in every key area
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-[#2f3a63] text-white">
            <div className="p-6 text-left font-bold text-lg">Features</div>
            <div className="p-6 text-center font-bold text-lg relative">
              <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">
                👑
              </div>
              ZUVOMO
            </div>
            <div className="p-6 text-center font-bold text-lg">Other Market Makers</div>
          </div>

          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-3 border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="p-6 font-semibold text-gray-800">{feature.name}</div>
              <div className="p-6 bg-emerald-50 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <Check className="text-emerald-600 w-6 h-6 flex-shrink-0" />
                  <span className="text-emerald-800 font-medium text-sm">{feature.zuvomo}</span>
                </div>
              </div>
              <div className="p-6 flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <X className="text-red-500 w-6 h-6 flex-shrink-0" />
                  <span className="text-red-700 font-medium text-sm">{feature.others}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTableSection;
