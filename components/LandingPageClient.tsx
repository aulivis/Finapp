'use client'

import React, { useState, useMemo } from 'react'
import HeroSection from '@/components/HeroSection'
import LandingCalculator from '@/components/LandingCalculator'
import ContextualComparison from '@/components/ContextualComparison'
import FAQ from '@/components/FAQ'
import EmailSignup from '@/components/EmailSignup'
import { historicalInflation } from '@/lib/data/inflation'

const DEFAULT_START_YEAR = 2015
const DEFAULT_END_YEAR = 2025
const DEFAULT_AMOUNT = 1000000

export default function LandingPageClient() {
  // Memoize available years calculation to avoid recomputing on every render
  const { minYear, maxYear } = useMemo(() => {
    const years = historicalInflation.map(d => d.year).sort((a, b) => a - b)
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years)
    }
  }, [])

  const [startYear, setStartYear] = useState(DEFAULT_START_YEAR)
  const [endYear, setEndYear] = useState(DEFAULT_END_YEAR)
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)

  // Validate and clamp years
  const validStartYear = Math.max(minYear, Math.min(startYear, maxYear))
  const validEndYear = Math.max(validStartYear, Math.min(endYear, maxYear))

  return (
    <>
      <HeroSection />
      <LandingCalculator 
        startYear={startYear}
        endYear={endYear}
        onStartYearChange={setStartYear}
        onEndYearChange={setEndYear}
        amount={amount}
        onAmountChange={setAmount}
      />
      <ContextualComparison 
        startYear={validStartYear} 
        endYear={validEndYear}
        userAmount={amount}
      />
      <FAQ />
      <EmailSignup />
    </>
  )
}