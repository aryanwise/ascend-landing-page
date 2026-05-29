'use client';
import { useEffect } from 'react';
import { RefreshCw, CheckCircle2, Circle, Loader2, Zap } from 'lucide-react';
import type { Goal, DayPlan } from '@/types';
import { generateDayPlan } from '@/lib/utils';

interface DayPlanScreenProps {
  goals: Goal[];
  energy: 'low' | 'medium' | 'high' | null;
  dayPlan: DayPlan | null;
  loading: boolean;
  onSetPlan: (plan: DayPlan) => void;
  onSetLoading: (v: boolean) => void;
  onToggleBlock: (index: number) => void;
}

const HOURS_MAP = { low: 5, medium: 8, high: 10 };

export default function DayPlanScreen({ goals, energy, dayPlan, loading, onSetPlan, onSetLoading, onToggleBlock }: DayPlanScreenProps) {

  const generate = async () => {
    onSetLoading(true);
    const goalData = goals.map(g => ({
      title: g.title,
      area: g.area,
      tasks: g.plan.dailyTasks.map(t => t.name),
    }));
    try {
      const plan = await generateDayPlan(goalData, energy ?? 'medium', HOURS_MAP[energy ?? 'medium']);
      onSetPlan(plan);
    } catch {
      onSetLoading(false);
    }
  };

  useEffect(() => {
    if (!dayPlan && !loading && goals.length > 0) generate();
  }, [goals.length]);

  const done = dayPlan?.blocks.filter(b => b.done).length ?? 0;
  const total = dayPlan?.blocks.length ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '14px 16px 10px', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px', color: '#1A1815' }}>Day Plan</div>
          {dayPlan && <div style={{ fontSize: 11, color: '#6B6359', marginTop: 2 }}>{done} of {total} blocks complete</div>}
        </div>
        <button onClick={generate} disabled={loading} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 10, border: '1px solid rgba(26,24,21,0.1)', background: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 600, color: '#6B6359', opacity: loading ? 0.5 : 1 }}>
          <RefreshCw size={11} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          Regenerate
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12 }}>
            <Loader2 size={24} color="#D9531E" style={{ animation: 'spin 1s linear infinite' }} />
            <div style={{ fontSize: 13, color: '#6B6359', textAlign: 'center' }}>
              Ascend is building your day around your goals and energy...
            </div>
          </div>
        )}

        {!loading && !dayPlan && goals.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', fontSize: 12, color: '#A8A095' }}>
            Create a goal first — the day plan is built around your active tasks.
          </div>
        )}

        {!loading && dayPlan && (
          <>
            {/* AI advice banner */}
            <div style={{ background: '#FFE9DD', borderRadius: 12, padding: '10px 12px', marginBottom: 14, display: 'flex', gap: 8 }}>
              <Zap size={13} color="#D9531E" style={{ marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 11, color: '#B33E0E', lineHeight: 1.5 }}>{dayPlan.advice}</span>
            </div>

            {/* Time blocks */}
            {dayPlan.blocks.map((block, i) => (
              <button
                key={i}
                onClick={() => onToggleBlock(i)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: block.done ? '#FBF9F4' : '#fff', border: '1px solid rgba(26,24,21,0.08)', borderRadius: 12, padding: '11px 12px', marginBottom: 8, cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ textAlign: 'right', width: 44, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#A8A095' }}>{block.time}</span>
                </div>
                <div style={{ width: 3, alignSelf: 'stretch', borderRadius: 2, background: block.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: block.done ? '#A8A095' : '#1A1815', textDecoration: block.done ? 'line-through' : 'none' }}>{block.task}</div>
                  <div style={{ fontSize: 10, color: '#A8A095', marginTop: 2 }}>
                    <span style={{ background: block.soft, color: block.color, padding: '1px 6px', borderRadius: 4, fontWeight: 700, marginRight: 6 }}>{block.area}</span>
                    {block.duration}
                  </div>
                </div>
                {block.done
                  ? <CheckCircle2 size={17} style={{ color: block.color, flexShrink: 0 }} fill={block.soft} />
                  : <Circle size={17} color="#A8A095" style={{ flexShrink: 0 }} />}
              </button>
            ))}

            {/* Deferred */}
            {dayPlan.deferred.length > 0 && (
              <>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', marginBottom: 8, marginTop: 4 }}>Deferred (honest)</div>
                {dayPlan.deferred.map((d, i) => (
                  <div key={i} style={{ background: '#FBF9F4', borderRadius: 10, padding: '9px 12px', marginBottom: 6, border: '1px solid rgba(26,24,21,0.06)' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#6B6359', textDecoration: 'line-through' }}>{d.task}</div>
                    <div style={{ fontSize: 10, color: '#A8A095', marginTop: 3 }}>{d.reason}</div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
