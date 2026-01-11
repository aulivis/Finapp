'use client'

import React from 'react'

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        backgroundColor: '#000',
        color: '#fff',
        padding: '8px 16px',
        textDecoration: 'none',
        zIndex: 1000,
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px'
      }}
    >
      Ugrás a fő tartalomhoz
    </a>
  )
}
