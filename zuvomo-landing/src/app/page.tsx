'use client'

import { useEffect, memo } from 'react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/sections/Hero'
import { AsSeen } from '@/components/sections/AsSeen'
import { FooterStatic } from '@/components/FooterStatic'
import EngagementSection from '@/Screen/EngagementSection'
import MarketMakingSection from '@/Screen/MarketMakingSection'
import PartnerExchangesSection from '@/Screen/PartnerExchangesSection'
import ComparisonTableSection from '@/Screen/ComparisonTableSection'
import TrustedProjectsStatsSection from '@/Screen/TrustedProjectsStatsSection'
import FinalCTASection from '@/Screen/FinalCTASection'
import { useScroll, useTransform } from 'framer-motion'
const MemoizedFooter = memo(FooterStatic)

export default function Home() {
   const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  


  return (
    <main className="font-sans">
      <Navigation />
      <Hero />

      <AsSeen />
      <EngagementSection />
      <MarketMakingSection />
      <PartnerExchangesSection />
      <ComparisonTableSection />
      <TrustedProjectsStatsSection />
      <FinalCTASection/>
   

      
      <MemoizedFooter />

    </main>
  )
}