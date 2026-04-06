export type ToolId =
  | 'ielts-trainer'
  | 'immigration-simulations'
  | 'visa-rejection-analyzer'
  | 'visa-interview-coach'
  | 'document-verification'
  | 'timeline-optimizer'
  | 'success-predictor';

export type ProgressEvent = {
  id: string;
  toolId: ToolId;
  createdAt: string;
  label: string;
  score?: number;
  meta?: Record<string, string | number | boolean | null>;
};

export type OutcomeEvent = {
  id: string;
  toolId?: ToolId;
  createdAt: string;
  country?: string;
  pathway?: string;
  outcome: 'approved' | 'rejected' | 'pending';
  notes?: string;
};

const STORAGE_KEY = 'vanhsya.toolProgress.v1';

type Stored = {
  events: ProgressEvent[];
  outcomes: OutcomeEvent[];
};

const safeParse = (raw: string | null): Stored => {
  if (!raw) return { events: [], outcomes: [] };
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return { events: [], outcomes: [] };
    const p = parsed as Partial<Stored>;
    return {
      events: Array.isArray(p.events) ? (p.events as ProgressEvent[]) : [],
      outcomes: Array.isArray(p.outcomes) ? (p.outcomes as OutcomeEvent[]) : []
    };
  } catch {
    return { events: [], outcomes: [] };
  }
};

const read = (): Stored => {
  if (typeof window === 'undefined') return { events: [], outcomes: [] };
  return safeParse(window.localStorage.getItem(STORAGE_KEY));
};

const write = (next: Stored) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

const uid = () =>
  `tp_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`}`;

export const addProgressEvent = (input: Omit<ProgressEvent, 'id' | 'createdAt'>): ProgressEvent => {
  const store = read();
  const event: ProgressEvent = { id: uid(), createdAt: new Date().toISOString(), ...input };
  write({ ...store, events: [event, ...store.events].slice(0, 2000) });
  return event;
};

export const addOutcomeEvent = (input: Omit<OutcomeEvent, 'id' | 'createdAt'>): OutcomeEvent => {
  const store = read();
  const event: OutcomeEvent = { id: uid(), createdAt: new Date().toISOString(), ...input };
  write({ ...store, outcomes: [event, ...store.outcomes].slice(0, 1000) });
  return event;
};

export const getToolEvents = (toolId: ToolId): ProgressEvent[] => read().events.filter((e) => e.toolId === toolId);

export const getAllEvents = (): ProgressEvent[] => read().events;

export const getAllOutcomes = (): OutcomeEvent[] => read().outcomes;

export const getCalibration = (): { approvalRate: number; sampleSize: number } => {
  const outcomes = read().outcomes;
  const decided = outcomes.filter((o) => o.outcome === 'approved' || o.outcome === 'rejected');
  const approved = decided.filter((o) => o.outcome === 'approved').length;
  const rate = decided.length ? approved / decided.length : 0;
  return { approvalRate: rate, sampleSize: decided.length };
};

export const exportProgress = (): Stored => read();

export const clearProgress = () => {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
};
