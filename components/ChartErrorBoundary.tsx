'use client'

import React, { Component, ReactNode } from 'react'

interface ChartErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ChartErrorBoundaryState {
  hasError: boolean
}

export class ChartErrorBoundary extends Component<ChartErrorBoundaryProps, ChartErrorBoundaryState> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ChartErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Chart rendering error:', error)
  }

  componentDidUpdate(prevProps: ChartErrorBoundaryProps) {
    // Reset error state when children change
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: '#6B7280'
        }}>
          Nem sikerült az ábra megjelenítése.
        </div>
      )
    }

    return this.props.children
  }
}
