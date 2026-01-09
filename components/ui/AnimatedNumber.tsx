'use client'

import React, { useEffect, useRef } from 'react'
import { animateNumber } from '@/lib/utils/number-animation'

interface AnimatedNumberProps {
  value: number
  formatter?: (value: number) => string
  duration?: number
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedNumber({
  value,
  formatter = (v) => v.toString(),
  duration = 1000,
  className = '',
  style,
}: AnimatedNumberProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const previousValueRef = useRef(value)

  useEffect(() => {
    if (elementRef.current && previousValueRef.current !== value) {
      animateNumber(
        elementRef.current,
        previousValueRef.current,
        value,
        duration,
        formatter
      )
      previousValueRef.current = value
    }
  }, [value, formatter, duration])

  return (
    <span ref={elementRef} className={className} style={style}>
      {formatter(value)}
    </span>
  )
}
