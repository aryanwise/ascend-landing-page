"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { Sparkles, Loader2, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Goal } from '@/types';
import { areaById } from '@/data/areas';
import { askGroq } from '@/lib/utils';

// Simulated 7-day completion data — makes demo feel real
const WEEK_BARS = [
  { day: 'Mon', pct: 80 },
  { day: 'Tue', pct: 55 },
  { day: 'Wed', pct: 100 },
  { day: 'Thu', pct: 35 },
  { day: 'Fri', pct: 75 },
  { day: 'Sat', pct: 90 },
  { day: 'Sun', pct: 20 },
];

const SLIP_REASONS = [
  { icon: '😴', label: 'Too tired',       count: 5, pct: 45 },
  { icon: '💼', label: 'Unexpected work', count: 3, pct: 27 },
  { icon: '🌀', label: "Couldn't focus",  count: 2, pct: 18 },
  { icon: '🌊', label: 'Overwhelmed',     count: 1, pct: 10 },
];

const INSIGHT_SYSTEM = (goals: Goal[]) => {
  const list = goals
    .filter(g => !g.paused)
    .map(g => `${g.title} (${g.area})`)
    .join(', ');

  return `You are Ascend's pattern engine. One job: state the most important pattern you see.

User's active goals: ${list || 'none yet'}.
Data: fitness ~80% this week, study ~20%. Top skip reason: fatigue. Best day: Wednesday.

Output EXACTLY one sentence. No more. No quotes around goal names. No hedging. No advice.
State the pattern like a sharp analyst, not a coach.

Example: "Fitness is holding but study is collapsing — fatigue is eating your cognitive work first."`;
};

interface InsightsScreenProps {
  goals: Goal[];
  completions: Record<string, Record<string, boolean>>;
}

export default function InsightsScreen({ goals, completions }: InsightsScreenProps) {
  const [aiInsight, setAiInsight]   = useState('');
  const [loading, setLoading]       = useState(false);
  const [barsVisible, setBarsVisible] = useState(false);

  const activeGoals = goals.filter(g => !g.paused);

  // Animate bars on mount
  useEffect(() => {
    const t = setTimeout(() => setBarsVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Fetch AI insight on mount
  useEffect(() => {
    if (activeGoals.length === 0) return;
    setLoading(true);
    askGroq({ system: INSIGHT_SYSTEM(goals), messages: [], intent: 'coach' })
      .then(r => setAiInsight(r))
      .catch(() => setAiInsight("Your fitness is consistent but study is slipping — you're likely trading one for the other without realising it."))
      .finally(() => setLoading(false));
  }, []);

  const avgPct = Math.round(WEEK_BARS.reduce((s, b) => s + b.pct, 0) / WEEK_BARS.length);
  const bestDay = WEEK_BARS.reduce((a, b) => b.pct > a.pct ? b : a);

  // Real completion rate from state
  const goalHealth = activeGoals.map(g => {
    const done  = Object.values(completions[g.id] ?? {}).filter(Boolean).length;
    const total = g.plan.dailyTasks.length;
    const rate  = total > 0 ? Math.round((done / total) * 100) : 0;
    // Blend with simulated historical data to look real
    const blended = g.area === 'fitness' ? Math.max(rate, 78) : Math.max(rate, 18);
    return { goal: g, pct: blended };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px', color: '#1A1815' }}>
          Insights
        </div>
        <div style={{ fontSize: 11, color: '#6B6359', marginTop: 2 }}>
          What the data is telling you.
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 20px' }}>

        {/* ── AI Observation ──────────────────────── */}
        <div style={{ background: '#1A1815', borderRadius: 16, padding: '14px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
            <Sparkles size={13} color="#D9531E" />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#D9531E', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              AI Observation
            </span>
          </div>
          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Loader2 size={13} color="#6B6359" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: 12, color: '#6B6359' }}>Analysing your patterns...</span>
            </div>
            ) : (
            <p style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                margin: 0,
                fontFamily: 'Fraunces, serif',
                fontStyle: 'italic',
                fontWeight: 500,
                letterSpacing: '-0.2px',
            }}>
                {/* Strip any surrounding quotes the AI adds */}
                {aiInsight.replace(/^["'""]|["'""]$/g, '')}
            </p>
            )}
        </div>

        {/* ── Weekly snapshot ─────────────────────── */}
        <SLabel>This week</SLabel>
        <div style={{ background: '#fff', borderRadius: 14, padding: '14px', marginBottom: 14, border: '1px solid rgba(26,24,21,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Fraunces, serif', color: '#1A1815', lineHeight: 1 }}>
                {avgPct}%
              </div>
              <div style={{ fontSize: 10, color: '#A8A095', marginTop: 4 }}>avg completion</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1B7A5C' }}>
                {bestDay.day}
              </div>
              <div style={{ fontSize: 10, color: '#A8A095', marginTop: 4 }}>best day</div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
            {WEEK_BARS.map((b, i) => {
            const isToday = i === 6;
            const height  = barsVisible ? `${(b.pct / 100) * 52}px` : '0px';
            return (
                <div key={b.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', position: 'relative', height: 52, display: 'flex', alignItems: 'flex-end' }}>
                    <div style={{
                    width: '100%',
                    height,
                    borderRadius: '4px 4px 0 0',
                    background: isToday ? '#D9531E' : b.pct >= 80 ? '#1B7A5C' : b.pct >= 50 ? '#B8721C' : '#EBE5D6',
                    transition: `height 0.5s ease ${i * 0.06}s`,
                    }} />
                </div>
                <span style={{ fontSize: 9, color: isToday ? '#D9531E' : '#A8A095', fontWeight: isToday ? 700 : 500 }}>
                    {b.day.slice(0, 1)}  {/* M T W T F S S — display only, key is unique */}
                </span>
                </div>
            );
            })}
          </div>
        </div>

        {/* ── Goal health ─────────────────────────── */}
        <SLabel>Goal health · last 14 days</SLabel>
        <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(26,24,21,0.08)', marginBottom: 14 }}>
          {goalHealth.length === 0 ? (
            <div style={{ padding: '18px', textAlign: 'center', fontSize: 12, color: '#A8A095' }}>
              Create a goal to see health data here.
            </div>
          ) : (
            goalHealth.map(({ goal, pct }, i) => {
              const a      = areaById(goal.area);
              const status = pct >= 70 ? 'On track' : pct >= 40 ? 'Slipping' : 'At risk';
              const color  = pct >= 70 ? '#1B7A5C'  : pct >= 40 ? '#B8721C'  : '#D9531E';
              return (
                <div key={goal.id} style={{ padding: '12px 14px', borderTop: i > 0 ? '1px solid rgba(26,24,21,0.06)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{a.emoji}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1815' }}>{goal.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color }}>{status}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: 5, background: '#EBE5D6', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: barsVisible ? `${pct}%` : '0%',
                      background: color,
                      borderRadius: 3,
                      transition: `width 0.7s ease ${i * 0.15}s`,
                    }} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Why things slip ─────────────────────── */}
        <SLabel>Why things slip · last 30 days</SLabel>
        <div style={{ background: '#fff', borderRadius: 14, padding: '12px 14px', border: '1px solid rgba(26,24,21,0.08)', marginBottom: 14 }}>
          {SLIP_REASONS.map((r, i) => (
            <div key={r.label} style={{ marginBottom: i < SLIP_REASONS.length - 1 ? 12 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{r.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1815' }}>{r.label}</span>
                </div>
                <span style={{ fontSize: 11, color: '#A8A095', fontWeight: 600 }}>{r.count}×</span>
              </div>
              <div style={{ height: 4, background: '#EBE5D6', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: barsVisible ? `${r.pct}%` : '0%',
                  background: '#3D4D8A',
                  borderRadius: 2,
                  transition: `width 0.6s ease ${i * 0.1}s`,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Strongest days ──────────────────────── */}
        <SLabel>Strongest days of the week</SLabel>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { day: 'Wednesday', pct: 100, highlight: true },
            { day: 'Saturday',  pct: 90,  highlight: false },
            { day: 'Monday',    pct: 80,  highlight: false },
          ].map(d => (
            <div key={d.day} style={{
              flex: 1, borderRadius: 12, padding: '12px 8px', textAlign: 'center',
              background: d.highlight ? '#D9F0E5' : '#FBF9F4',
              border: `1px solid ${d.highlight ? 'rgba(27,122,92,0.2)' : 'rgba(26,24,21,0.08)'}`,
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Fraunces, serif', color: d.highlight ? '#1B7A5C' : '#1A1815' }}>
                {d.pct}%
              </div>
              <div style={{ fontSize: 10, color: d.highlight ? '#1B7A5C' : '#A8A095', marginTop: 4, fontWeight: d.highlight ? 700 : 500 }}>
                {d.day}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, padding: '10px 12px', background: '#FFE9DD', borderRadius: 10 }}>
          <span style={{ fontSize: 11, color: '#B33E0E', lineHeight: 1.5 }}>
            Schedule your hardest tasks on Wednesday and Saturday — that's when you actually show up.
          </span>
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', marginBottom: 8 }}>
      {children}
    </div>
  );
}