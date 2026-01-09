'use client'

import { useState, useEffect } from 'react'

/**
 * Hook to detect mobile viewport (<= 768px).
 * Useful for responsive UI that needs to adjust layout on mobile devices.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === 'undefined') {
      setIsMobile(false)
      return
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint)
    }

    // Initial check
    checkMobile()

    // Listen for resize
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [breakpoint])

  return isMobile
}
