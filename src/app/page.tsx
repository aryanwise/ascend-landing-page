'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DemoContainer from '@/components/demo/DemoContainer';
import WaitlistForm from '@/components/landing/WaitlistForm';

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const features = [
    { icon: '🎯', title: 'Multi-Area Goals', desc: '9 critical life dimensions, capped at one radical focus per area. Fitness, deep research, engineering stacks, and finance — managed in total lockstep.' },
    { icon: '📋', title: 'Daily Priorities', desc: 'Pin 1–3 non-negotiable execution steps every morning. Explicitly decoupled from long-term loops so you maintain clear, daily clarity.' },
    { icon: '💬', title: 'Adaptive Coach Chat', desc: 'An AI partner trained on your specific behavioral bottlenecks. Zero generic platitudes — just raw, context-aware analysis and strategizing.' },
    { icon: '🤖', title: 'Personal AI Assistant', desc: 'Outsource heavy lifting directly from the interface. Instantly structure chaotic notes, run competitive research, and compile local summaries in the background.' },
    { icon: '📊', title: 'Insights Dashboard', desc: 'Quantify your momentum. Trace system health indices, diagnose recurring operational friction points, and isolate your peak performance windows.' },
    { icon: '⏸️', title: 'Guilt-Free Pause', desc: 'Real life does not run linearly. Gracefully pause specific operational vectors for a week without degrading your historical metrics or breaking streaks.' },
    { icon: '🔁', title: 'Dynamic System Voice', desc: 'Calibrate the feedback style to your current state. Toggle seamlessly between uncompromising accountability, analytical strategy, or balanced tracking.' },
  ];

  return (
    <>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, borderBottom: '1px solid rgba(26,24,21,0.08)', padding: '16px 0', backdropFilter: 'blur(20px)', background: 'rgba(248,245,239,0.88)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: '#D9531E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#fff' }}>A</span>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.5px', color: '#1A1815' }}>ASCEND</span>
          </a>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href="#how" className="nav-link-hide" style={{ fontSize: 13, color: '#6B6359', textDecoration: 'none', fontWeight: 500 }}>How it works</a>
            <a href="#features" className="nav-link-hide" style={{ fontSize: 13, color: '#6B6359', textDecoration: 'none', fontWeight: 500 }}>Features</a>
            <a href="#demo" className="nav-link-hide" style={{ fontSize: 13, color: '#6B6359', textDecoration: 'none', fontWeight: 500 }}>Try demo</a>
            <a href="#waitlist" style={{ background: '#1A1815', color: '#fff', padding: '9px 16px', borderRadius: 10, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>Join waitlist</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ paddingTop: 140, paddingBottom: 80 }}>
        <div className="container">
          <div className="hero-grid" style={{ display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#FFE9DD', borderRadius: 99, padding: '6px 14px', marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D9531E', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#D9531E' }}>In active development</span>
              </div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(42px, 7vw, 88px)', fontWeight: 700, lineHeight: 0.95, letterSpacing: '-3px', marginBottom: 24, color: '#1A1815' }}>
                Not another{' '}
                <span style={{ position: 'relative', display: 'inline-block', color: '#A8A095' }}>
                  tracker
                  <span style={{ position: 'absolute', left: -4, right: -4, top: '50%', height: 8, background: '#D9531E', transform: 'rotate(-1.5deg) translateY(-50%)', borderRadius: 2 }} />
                </span>
                .<br />
                A <em style={{ color: '#D9531E' }}>cognitive partner</em>.
              </h1>
              <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: '#6B6359', maxWidth: 580, lineHeight: 1.6, marginBottom: 36 }}>
                The goal app that learns <em>why</em> you slip — then re-engineers your plan around your real life, real energy, real constraints.
              </p>
              <div className="hero-ctas" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#D9531E', color: '#fff', padding: '16px 28px', borderRadius: 14, fontSize: 15, fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(217,83,30,0.35)' }}>
                  Try the demo →
                </a>
                <a href="#how" style={{ display: 'inline-flex', alignItems: 'center', padding: '16px 24px', borderRadius: 14, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(26,24,21,0.14)', color: '#1A1815' }}>
                  See how it works
                </a>
              </div>
            </div>

            {/* Static phone preview (hero) */}
            <div className="hero-phone-col" style={{ flex: '0 0 auto', display: 'flex', justifyContent: 'center' }}>
              <HeroPhonePreview />
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section-pad" style={{ background: '#1A1815', color: '#fff', padding: '100px 0' }}>
        <div className="container">
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#D9531E', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>The shame cycle</div>
          <div className="problem-quote" style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(22px, 4vw, 46px)', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.25, maxWidth: 860, position: 'relative', paddingLeft: 56, borderLeft: '4px solid #D9531E', color: 'rgba(255,255,255,0.92)' }}>
            <span style={{ position: 'absolute', left: 8, top: -10, fontSize: 'clamp(60px, 8vw, 110px)', fontFamily: 'Fraunces, serif', color: '#D9531E', lineHeight: 1 }}>"</span>
            Try harder. Just be consistent. Build the habit. As if I haven't tried. As if missing the gym twice means I'm broken. As if the plan can't be the thing that's wrong.
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#D9531E', textTransform: 'uppercase', letterSpacing: '2px', marginTop: 24 }}>— Everyone who's deleted Habitica</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section-pad" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#D9531E', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>How it works</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 16, maxWidth: 700 }}>The plan flexes around you.</h2>
          <p style={{ fontSize: 17, color: '#6B6359', maxWidth: 560, marginBottom: 50, lineHeight: 1.6 }}>Five behaviors make Ascend different from anything else you've tried.</p>

          <div className="how-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <HowCard featured num="01" title="The Two-Strike Rule" desc="Miss the same task twice? AI stops the schedule, asks why, proposes a real change — modify, pause, or remove. No guilt. Just recalibration." example="→ Day 2 miss: 'Mornings aren't working. Move to evenings or pause for the week?'" />
            <HowCard num="02" title="Honest Reasons" desc={`Tap "Couldn't?" and pick what actually got in the way. AI builds memory of your real blockers, not just missed checkboxes.`} />
            <HowCard num="03" title="AI Goal Planning" desc="5 sharp questions about your real constraints — health, time, past failures. Builds a plan that fits your life, not a generic template." />
            <HowCard num="04" title="AI Day Planner" desc="A realistic time-blocked schedule. Honest about what fits. Heavy cognitive work in high-energy windows. Defers what won't happen today." />
            <HowCard num="05" title="Coach with Memory" desc="Talks to an AI that knows your goals, your reflections, and your slip patterns. No generic motivation — specific, honest advice." />
          </div>
        </div>
      </section>

      {/* FEATURES CAROUSEL */}
      <section id="features" className="section-pad" style={{ background: '#EBE5D6', padding: '100px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          
          {/* Header Block */}
          <div style={{ marginBottom: 48, paddingLeft: 32, borderLeft: '3px solid #D9531E' }}>
            <div style={{ 
              fontSize: 11, 
              fontFamily: 'JetBrains Mono, monospace', 
              fontWeight: 700, 
              color: '#D9531E', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              marginBottom: 12 
            }}>
              What's inside
            </div>
            <h2 style={{ 
              fontFamily: 'Fraunces, serif', 
              fontSize: 'clamp(32px, 4.5vw, 54px)', 
              fontWeight: 700, 
              letterSpacing: '-1.5px', 
              lineHeight: 1.2, 
              maxWidth: '720px', // Constrains the width perfectly to balance line 2
              color: '#1A1815',
              margin: 0
            }}>
              Built for everyone.<br />
              A supportive system for when the next step feels heavy.
            </h2>
          </div>

          {/* Carousel Track wrapper */}
          <div 
            className="carousel-track"
            ref={scrollContainerRef}
            style={{ 
              display: 'flex', 
              gap: 20, 
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              paddingTop: '24px',      // Expands the shorthand into individual explicit keys
              paddingBottom: '24px',
              paddingLeft: '0px',
              paddingRight: '24px',    // Clean combination with no runtime styling bugs
              marginRight: '-24px'
            }}
          >
            {features.map(f => (
              <div 
                key={f.title} 
                className="carousel-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 20, 
                  padding: '32px 28px', 
                  border: '1px solid rgba(26,24,21,0.05)',
                  boxShadow: '0 10px 30px -10px rgba(26,24,21,0.04), 0 1px 1px rgba(26,24,21,0.01)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '340px',
                  flexShrink: 0,
                  scrollSnapAlign: 'center', /* Snap to middle for an intentional, premium look */
                  transition: 'transform 0.4s cubic-bezier(0.2, 1, 0.3, 1), box-shadow 0.4s ease, opacity 0.4s ease',
                }}
              >
                <div style={{ 
                  fontSize: 32, 
                  marginBottom: 20,
                  width: '56px',
                  height: '56px',
                  background: '#FAF8F5',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(26,24,21,0.03)'
                }}>
                  {f.icon}
                </div>
                <h3 style={{ 
                  fontFamily: 'Fraunces, serif', 
                  fontSize: 21, 
                  fontWeight: 700, 
                  marginBottom: 12, 
                  letterSpacing: '-0.3px',
                  color: '#1A1815'
                }}>
                  {f.title}
                </h3>
                <p style={{ 
                  fontSize: 13.5, 
                  color: '#6B6359', 
                  lineHeight: 1.65,
                  margin: 0
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons Below Track */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32 }}>
            <button 
              onClick={() => scroll('left')}
              className="nav-btn"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '1px solid rgba(26,24,21,0.12)',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1815',
                boxShadow: '0 4px 12px rgba(26,24,21,0.03)',
                transition: 'all 0.25s cubic-bezier(0.2, 1, 0.3, 1)'
              }}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="nav-btn"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '1px solid rgba(26,24,21,0.12)',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1A1815',
                boxShadow: '0 4px 12px rgba(26,24,21,0.03)',
                transition: 'all 0.25s cubic-bezier(0.2, 1, 0.3, 1)'
              }}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>

        </div>

        {/* CSS for Premium Hover States and Core Scrolling Engine */}
        <style jsx global>{`
          .carousel-track::-webkit-scrollbar {
            display: none;
          }
          .carousel-track {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          /* Card Hover States */
          .carousel-card:hover {
            transform: translateY(-4px) scale(1.01) !important;
            border-color: rgba(219, 83, 30, 0.2) !important;
            box-shadow: 0 20px 40px -15px rgba(217,83,30,0.08), 0 1px 2px rgba(217,83,30,0.02) !important;
          }

          /* Arrow Navigation Button Hover States */
          .nav-btn:hover {
            background: #1A1815 !important;
            color: #fff !important;
            border-color: #1A1815 !important;
            transform: scale(1.08);
            box-shadow: 0 8px 20px rgba(26,24,21,0.15) !important;
          }
          .nav-btn:active {
            transform: scale(0.95);
          }
        `}</style>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="demo" className="section-pad" style={{ background: '#EBE5D6', padding: '100px 0' }}>
        <div className="container">
          <div className="demo-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#D9531E', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 16 }}>Try it now</div>
              <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: 18 }}>The full story, in your hand.</h2>
              <p style={{ fontSize: 16, color: '#6B6359', marginBottom: 24, lineHeight: 1.6 }}>No signup. No data saved. Walk through real goal creation, a missed task, the Two-Strike recalibration, and the AI coach — with real AI responses.</p>
              <div style={{ background: '#FFE9DD', borderRadius: 16, padding: '20px', marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#D9531E', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 14 }}>What you'll experience</div>
                {['Create a real goal with AI-guided questions', 'Get a plan built around your constraints', 'See the Two-Strike recalibration in Goals tab', 'Generate and edit your AI day plan', 'Ask the coach a real question'].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 9, alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, color: '#D9531E', fontSize: 12, flexShrink: 0 }}>0{i + 1}</span>
                    <span style={{ fontSize: 13, color: '#1A1815' }}>{s}</span>
                  </div>
                ))}
              </div>
              <Link href="/demo" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#D9531E', textDecoration: 'none' }}>
                Open fullscreen demo →
              </Link>
            </div>

            <div className="demo-phone-col" style={{ display: 'flex', justifyContent: 'center' }}>
              <DemoContainer embedded />
            </div>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="waitlist-section" style={{ background: '#1A1815', color: '#fff', padding: '120px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(217,83,30,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(217,83,30,0.1) 0%, transparent 40%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#D9531E', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 20 }}>Limited beta</div>
          <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-2px', marginBottom: 20 }}>
            Stop tracking.<br /><em style={{ color: '#D9531E' }}>Start recalibrating.</em>
          </h2>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Ascend is in active development. We're inviting people who've been burned by traditional productivity apps and want something genuinely different.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '60px 0 40px', borderTop: '1px solid rgba(26,24,21,0.08)' }}>
        <div className="container">
          <div className="footer-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <span style={{ fontSize: 13, color: '#6B6359', fontWeight: 500 }}>© 2026 Ascend · Built with care, not shame.</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <a href="mailto:aryanmishraa12@gmail.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 500, color: '#6B6359', textDecoration: 'none' }}>Contact</a>
              <a href="#how" style={{ fontSize: 13, fontWeight: 500, color: '#6B6359', textDecoration: 'none' }}>How it works</a>
              <a href="#demo" style={{ fontSize: 13, fontWeight: 500, color: '#6B6359', textDecoration: 'none' }}>Try demo</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

/* ─── INLINE COMPONENTS ─────────────────────────────── */
function HowCard({ num, title, desc, example, featured }: { num: string; title: string; desc: string; example?: string; featured?: boolean }) {
  return (
    <div className={featured ? 'how-card-featured' : ''} style={{ borderRadius: 24, padding: '28px 32px', border: featured ? 'none' : '1px solid rgba(26,24,21,0.08)', background: featured ? 'linear-gradient(135deg, #FFE9DD, #FFD5BC)' : '#fff', gridColumn: featured ? 'span 2' : undefined }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: featured ? '#B33E0E' : '#A8A095', letterSpacing: '1.5px', marginBottom: 12 }}>PRINCIPLE {num}</div>
      <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: featured ? 30 : 24, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 10, color: featured ? '#B33E0E' : '#1A1815', lineHeight: 1.15 }}>{title}</h3>
      <p style={{ fontSize: 15, color: featured ? '#B33E0E' : '#6B6359', lineHeight: 1.6, marginBottom: example ? 14 : 0, opacity: featured ? 0.9 : 1 }}>{desc}</p>
      {example && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#B33E0E', background: 'rgba(255,255,255,0.55)', padding: '12px 14px', borderRadius: 10, borderLeft: '3px solid #D9531E', lineHeight: 1.6 }}>{example}</div>}
    </div>
  );
}

function HeroPhonePreview() {
  return (
    <div style={{ width: 300, borderRadius: 44, padding: 8, background: '#1A1815', boxShadow: '0 30px 80px -20px rgba(0,0,0,0.4)', transform: 'perspective(1200px) rotateY(-8deg) rotateX(3deg)' }}>
      <div style={{ borderRadius: 36, background: '#F8F5EF', padding: '36px 16px 16px', minHeight: 520, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 26, borderRadius: 18, background: '#000' }} />
        <div style={{ fontSize: 11, color: '#6B6359', marginBottom: 2 }}>Good morning</div>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#1A1815', marginBottom: 12 }}>Recalibrate.</div>
        <div style={{ background: '#fff', border: '2px solid #D9531E', borderRadius: 14, padding: '10px 12px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, background: '#D9531E', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>!</div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#D9531E' }}>Goals · Needs recalibration</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#1A1815', marginTop: 2 }}>Morning workout — 2 misses</div>
          </div>
        </div>
        <div style={{ background: '#1A1815', borderRadius: 16, padding: '12px 14px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', fontWeight: 700 }}>STREAK</div>
            <div style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 700, color: '#fff' }}>4 <span style={{ fontSize: 11, opacity: 0.45 }}>days</span></div>
          </div>
          <div style={{ background: '#D9531E', borderRadius: 10, padding: 9, fontSize: 18 }}>🔥</div>
        </div>
        {[{ name: 'Practice Python', area: 'Study', done: true }, { name: 'Drink 2L water', area: 'Health', done: false }, { name: 'Deep work block', area: 'Career', done: false }].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '7px 0', borderBottom: '1px solid rgba(26,24,21,0.05)' }}>
            <div style={{ width: 17, height: 17, borderRadius: '50%', background: t.done ? '#1B7A5C' : 'transparent', border: t.done ? 'none' : '1.5px solid #A8A095', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {t.done && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, flex: 1, color: t.done ? '#A8A095' : '#1A1815', textDecoration: t.done ? 'line-through' : 'none' }}>{t.name}</span>
            <span style={{ fontSize: 8, fontWeight: 700, background: '#E3E7F4', color: '#3D4D8A', padding: '1px 5px', borderRadius: 4 }}>{t.area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}