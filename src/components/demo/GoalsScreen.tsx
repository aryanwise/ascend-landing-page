'use client';
import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, PauseCircle } from 'lucide-react';
import type { Goal } from '@/types';
import { areaById } from '@/data/areas';
import { formatFrequency } from '@/lib/utils';

interface GoalsScreenProps {
  goals: Goal[];
  completions: Record<string, Record<string, boolean>>;
  onOpenRecalibrate: (goalId: string, taskId: string) => void;
}

export default function GoalsScreen({ goals, completions, onOpenRecalibrate }: GoalsScreenProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const active = goals.filter(g => !g.paused);
  const paused = goals.filter(g => g.paused);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '14px 16px 10px', flexShrink: 0 }}>
        <div style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px', color: '#1A1815' }}>Goals</div>
        <div style={{ fontSize: 11, color: '#6B6359', marginTop: 2 }}>
          {active.length} active · {paused.length} paused · one per life area
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 16px' }}>

        {/* ── Active ────────────────────────────── */}
        {active.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            completions={completions[goal.id] ?? {}}
            isExpanded={expanded.has(goal.id)}
            onToggle={() => toggle(goal.id)}
            onOpenRecalibrate={onOpenRecalibrate}
          />
        ))}

        {/* ── Paused ────────────────────────────── */}
        {paused.length > 0 && (
          <>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', margin: '18px 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <PauseCircle size={11} />
              Paused
            </div>
            {paused.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                completions={{}}
                isExpanded={expanded.has(goal.id)}
                onToggle={() => toggle(goal.id)}
                onOpenRecalibrate={onOpenRecalibrate}
                dimmed
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ── GoalCard ─────────────────────────────────────────────── */
function GoalCard({
  goal, completions, isExpanded, onToggle, onOpenRecalibrate, dimmed = false,
}: {
  goal: Goal;
  completions: Record<string, boolean>;
  isExpanded: boolean;
  onToggle: () => void;
  onOpenRecalibrate: (goalId: string, taskId: string) => void;
  dimmed?: boolean;
}) {
  const a = areaById(goal.area);
  const tasksDone = Object.values(completions).filter(Boolean).length;
  const tasksTotal = goal.plan.dailyTasks.length;
  const rate = tasksTotal > 0 ? tasksDone / tasksTotal : 0;
  const pct = Math.round(rate * 100);

  const hasMiss = (goal.missedDays ?? 0) >= 2 && !goal.plan.dailyTasks.some(t => t.intervened);
  const missedTask = hasMiss ? goal.plan.dailyTasks[0] : null;
  const isRecalibrated = goal.plan.dailyTasks.some(t => t.intervened);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      marginBottom: 10,
      border: hasMiss ? '2px solid #D9531E' : '1px solid rgba(26,24,21,0.08)',
      opacity: dimmed ? 0.65 : 1,
      overflow: 'hidden',
    }}>
      {/* Warning banner */}
      {hasMiss && !isRecalibrated && (
        <button
          onClick={() => missedTask && onOpenRecalibrate(goal.id, missedTask.id)}
          style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', background: '#FFE9DD', padding: '10px 14px', border: 'none', cursor: 'pointer', textAlign: 'left' }}
        >
          <AlertTriangle size={14} color="#D9531E" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#D9531E' }}>Needs recalibration</div>
            <div style={{ fontSize: 10, color: '#B33E0E', marginTop: 1 }}>
              "{missedTask?.name}" missed {goal.missedDays} days in a row
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#D9531E', flexShrink: 0 }}>Fix →</div>
        </button>
      )}

      {/* Recalibrated badge */}
      {isRecalibrated && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#D9F0E5', padding: '7px 14px' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#1B7A5C' }}>✓ Recalibrated — plan updated</span>
        </div>
      )}

      {/* Paused badge */}
      {goal.paused && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#F8F5EF', padding: '6px 14px', borderBottom: '1px solid rgba(26,24,21,0.06)' }}>
          <PauseCircle size={10} color="#A8A095" />
          <span style={{ fontSize: 10, fontWeight: 600, color: '#A8A095' }}>Paused</span>
        </div>
      )}

      {/* Main tap area — header + progress */}
      <button
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'flex-start', gap: 12, width: '100%', padding: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{
          width: 42, height: 42, borderRadius: 12,
          background: a.soft, display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 22, flexShrink: 0,
        }}>
          {a.emoji}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1815', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {goal.title}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: a.color }}>
            {a.label} · {goal.plan.duration}
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: '#A8A095' }}>Completion</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: pct > 60 ? '#1B7A5C' : pct > 30 ? '#B8721C' : '#D9531E' }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: '#EBE5D6', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: pct > 60 ? '#1B7A5C' : pct > 30 ? '#B8721C' : '#D9531E', borderRadius: 2, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 2, flexShrink: 0 }}>
          {isExpanded
            ? <ChevronUp size={15} color="#A8A095" />
            : <ChevronDown size={15} color="#A8A095" />}
        </div>
      </button>

      {/* Expanded — task list (no checkboxes, just info) */}
      {isExpanded && (
        <div style={{ borderTop: '1px solid rgba(26,24,21,0.06)', padding: '12px 14px 14px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#A8A095', marginBottom: 10 }}>
            Recurring tasks
          </div>
          {goal.plan.dailyTasks.map((t, i) => (
            <div
              key={t.id}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                paddingTop: i > 0 ? 9 : 0,
                borderTop: i > 0 ? '1px solid rgba(26,24,21,0.05)' : 'none',
              }}
            >
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: t.intervened ? '#1B7A5C' : a.color, marginTop: 5, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#1A1815', display: 'flex', alignItems: 'center', gap: 6 }}>
                  {t.name}
                  {t.intervened && (
                    <span style={{ fontSize: 8, fontWeight: 700, color: '#1B7A5C', background: '#D9F0E5', padding: '1px 5px', borderRadius: 4 }}>UPDATED</span>
                  )}
                </div>
                <div style={{ fontSize: 10, color: '#A8A095', marginTop: 2 }}>
                  {formatFrequency(t.frequency)}{t.duration ? ` · ${t.duration}` : ''}
                </div>
              </div>
            </div>
          ))}

          {goal.plan.tips.length > 0 && (
            <div style={{ marginTop: 12, background: a.soft, borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: a.color, marginBottom: 6 }}>Coach tip</div>
              <div style={{ fontSize: 11, color: '#1A1815', lineHeight: 1.55 }}>{goal.plan.tips[0]}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}