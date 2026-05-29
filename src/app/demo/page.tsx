import Link from 'next/link';
import DemoContainer from '@/components/demo/DemoContainer';

export default function DemoPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
      <div style={{ position: 'fixed', top: 16, left: 16, zIndex: 50 }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fff', border: '1px solid rgba(26,24,21,0.1)', borderRadius: 99, padding: '8px 14px', fontSize: 12, fontWeight: 600, color: '#1A1815', textDecoration: 'none' }}>
          ← Back to site
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, letterSpacing: '-1px', color: '#1A1815', marginBottom: 8 }}>
          Try Ascend
        </h1>
        <p style={{ fontSize: 14, color: '#6B6359', maxWidth: 400 }}>
          Full interactive demo — real AI, no signup, no data saved.
        </p>
      </div>

      <DemoContainer />
    </main>
  );
}
