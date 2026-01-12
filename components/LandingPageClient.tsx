'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import LandingCalculator from '@/components/LandingCalculator'
import ContextualComparison from '@/components/ContextualComparison'
import M2Section from '@/components/M2Section'
import FAQ from '@/components/FAQ'
import EmailSignup from '@/components/EmailSignup'
import { historicalInflation } from '@/lib/data/inflation'

const DEFAULT_START_YEAR = 2015
const DEFAULT_END_YEAR = 2025
const DEFAULT_AMOUNT = 1000000

export default function LandingPageClient() {
  const searchParams = useSearchParams()
  
  // Memoize available years calculation to avoid recomputing on every render
  const { minYear, maxYear } = useMemo(() => {
    const years = historicalInflation.map(d => d.year).sort((a, b) => a - b)
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years)
    }
  }, [])

  // Initialize state from URL params or defaults
  const getInitialStartYear = () => {
    const param = searchParams.get('startYear')
    if (param) {
      const year = parseInt(param)
      if (!isNaN(year) && year >= minYear && year <= maxYear) {
        return year
      }
    }
    return DEFAULT_START_YEAR
  }

  const getInitialEndYear = () => {
    const param = searchParams.get('endYear')
    if (param) {
      const year = parseInt(param)
      if (!isNaN(year) && year >= minYear && year <= maxYear) {
        return year
      }
    }
    return DEFAULT_END_YEAR
  }

  const getInitialAmount = () => {
    const param = searchParams.get('amount')
    if (param) {
      const amt = parseFloat(param)
      if (!isNaN(amt) && amt > 0) {
        return amt
      }
    }
    return DEFAULT_AMOUNT
  }

  const [startYear, setStartYear] = useState(getInitialStartYear)
  const [endYear, setEndYear] = useState(getInitialEndYear)
  const [amount, setAmount] = useState(getInitialAmount)

  // Update state when URL params change
  useEffect(() => {
    const newStartYear = getInitialStartYear()
    const newEndYear = getInitialEndYear()
    const newAmount = getInitialAmount()
    
    if (newStartYear !== startYear) setStartYear(newStartYear)
    if (newEndYear !== endYear) setEndYear(newEndYear)
    if (newAmount !== amount) setAmount(newAmount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

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
      <M2Section 
        startYear={validStartYear}
        endYear={validEndYear}
      />
      <FAQ />
      <EmailSignup />
    </>
  )
}