'use client';
import { AlertTriangle, ChevronRight, CheckCircle2, Pause } from 'lucide-react';
import type { Goal } from '@/types';
import { areaById } from '@/data/areas';

interface GoalsScreenProps {
  goals: Goal[];
  completions: Record<string, Record<string, boolean>>;
  onOpenRecalibrate: (goalId: string, taskId: string) => void;
}

export default function GoalsScreen({ goals, completions, onOpenRecalibrate }: GoalsScreenProps) {
  const active = goals.filter(g => !g.paused);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px', color: '#1A1815' }}>Goals</div>
        <div style={{ fontSize: 11, color: '#6B6359', marginTop: 2 }}>{active.length} active · one per life area</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>
        {active.map(goal => {
          const a = areaById(goal.area);
          const tasksDone = Object.values(completions[goal.id] ?? {}).filter(Boolean).length;
          const totalTasks = goal.plan.dailyTasks.length;
          const rate = totalTasks > 0 ? tasksDone / totalTasks : 0;
          const hasMisses = (goal.missedDays ?? 0) >= 2;
          const missedTask = hasMisses ? goal.plan.dailyTasks[0] : null;

          return (
            <div key={goal.id} style={{ background: '#fff', borderRadius: 16, padding: '14px', marginBottom: 10, border: hasMisses ? '2px solid #D9531E' : '1px solid rgba(26,24,21,0.08)' }}>
              {/* Warning banner */}
              {hasMisses && !goal.plan.dailyTasks.find(t => t.intervened) && (
                <button
                  onClick={() => missedTask && onOpenRecalibrate(goal.id, missedTask.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: '#FFE9DD', borderRadius: 10, padding: '10px 12px', marginBottom: 12, border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <AlertTriangle size={16} color="#D9531E" style={{ flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#D9531E' }}>Needs recalibration</div>
                    <div style={{ fontSize: 10, color: '#B33E0E', marginTop: 1 }}>
                      "{missedTask?.name}" missed {goal.missedDays} days in a row
                    </div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#D9531E' }}>Fix →</div>
                </button>
              )}

              {/* Recalibrated badge */}
              {goal.plan.dailyTasks.some(t => t.intervened) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#D9F0E5', borderRadius: 8, padding: '7px 10px', marginBottom: 10 }}>
                  <CheckCircle2 size={13} color="#1B7A5C" />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#1B7A5C' }}>Recalibrated — plan updated</span>
                </div>
              )}

              {/* Goal header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: a.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {a.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1815', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{goal.title}</div>
                  <div style={{ fontSize: 10, color: a.color, fontWeight: 700, marginTop: 2 }}>{a.label} · {goal.plan.duration}</div>
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: '#A8A095' }}>Today's completion</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: rate > 0.6 ? '#1B7A5C' : rate > 0.3 ? '#B8721C' : '#D9531E' }}>{Math.round(rate * 100)}%</span>
                </div>
                <div style={{ height: 4, background: '#EBE5D6', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${rate * 100}%`, background: rate > 0.6 ? '#1B7A5C' : rate > 0.3 ? '#B8721C' : '#D9531E', borderRadius: 2, transition: 'width 0.4s ease' }} />
                </div>
              </div>

              {/* Tasks */}
              <div style={{ marginTop: 10 }}>
                {goal.plan.dailyTasks.slice(0, 4).map(t => (
                  <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderTop: '1px solid rgba(26,24,21,0.05)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.intervened ? '#1B7A5C' : a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#1A1815', flex: 1 }}>{t.name}</span>
                    {t.intervened && <span style={{ fontSize: 9, fontWeight: 700, color: '#1B7A5C', background: '#D9F0E5', padding: '1px 5px', borderRadius: 4 }}>UPDATED</span>}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
