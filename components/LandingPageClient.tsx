'use client'

import React, { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import LandingCalculator from '@/components/LandingCalculator'
import ContextualComparison from '@/components/ContextualComparison'
import EmailSignup from '@/components/EmailSignup'
import { historicalInflation } from '@/lib/data/inflation'

const DEFAULT_START_YEAR = 2015
const DEFAULT_END_YEAR = 2025

export default function LandingPageClient() {
  // Get available years from historical inflation data
  const availableYears = historicalInflation.map(d => d.year).sort((a, b) => a - b)
  const minYear = Math.min(...availableYears)
  const maxYear = Math.max(...availableYears)

  const [startYear, setStartYear] = useState(DEFAULT_START_YEAR)
  const [endYear, setEndYear] = useState(DEFAULT_END_YEAR)

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
      />
      <ContextualComparison 
        startYear={validStartYear} 
        endYear={validEndYear} 
      />
      <EmailSignup />
    </>
  )
}