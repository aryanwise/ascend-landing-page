'use client';
import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
  tilt?: boolean;
}

export default function PhoneFrame({ children, tilt = false }: PhoneFrameProps) {
  return (
    <div
      style={{
        width: 375,
        flexShrink: 0,
        borderRadius: 48,
        padding: 10,
        background: '#1A1815',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.5)',
        transform: 'none',
        transition: 'transform 0.4s ease',
      }}
    >
      {/* Screen */}
      <div
        style={{
          borderRadius: 40,
          background: '#F8F5EF',
          height: 720,
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status bar / notch */}
        <div style={{ height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: 120, height: 28, background: '#000', borderRadius: 18, position: 'absolute' }} />
        </div>

        {/* Content area — fixed, scrollable inside */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
