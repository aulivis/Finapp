'use client'

import React from 'react'
import CalculatorsClient from '@/components/CalculatorsClient'
import QuarterlyUpdateSummary from '@/components/QuarterlyUpdateSummary'

interface CalculatorsWrapperProps {
  historicalData: Array<{ year: number; inflationRate: number }>
  latestYear: number
  inflationM2Data: { inflationRate: number; m2Growth: number | null } | null
  projectedInflation: number
  currentYear: number
  doNothingM2Data: { inflationRate: number; m2Growth: number | null } | null
  dataSources: string[]
  quarterlySummary?: {
    quarterName: string
    summaryPoints: string[]
  }
}

export default function CalculatorsWrapper({
  historicalData,
  latestYear,
  inflationM2Data,
  projectedInflation,
  currentYear,
  doNothingM2Data,
  dataSources,
  quarterlySummary
}: CalculatorsWrapperProps) {
  return (
    <>
      {quarterlySummary && (
        <QuarterlyUpdateSummary 
          quarterName={quarterlySummary.quarterName}
          summaryPoints={quarterlySummary.summaryPoints}
        />
      )}
      <CalculatorsClient
        historicalData={historicalData}
        latestYear={latestYear}
        inflationM2Data={inflationM2Data}
        projectedInflation={projectedInflation}
        currentYear={currentYear}
        doNothingM2Data={doNothingM2Data}
        dataSources={dataSources}
      />
    </>
  )
}
