import { ensureAiConfigured } from '@/lib/aiJson';
import { getMongoClient } from '../../../../lib/mongodb.ts';
import { POST as eligibilityPost } from '../../ai/eligibility/route';
import { POST as cvBuilderPost } from '../../ai/cv-builder/route';
import { POST as sopGeneratorPost } from '../../ai/sop-generator/route';
import { POST as timelinePost } from '../../ai/timeline-optimizer/route';
import { POST as successPredictorPost } from '../../ai/success-predictor/route';
import { POST as interviewPost } from '../../ai/visa-interview-coach/route';
import { POST as rejectionPost } from '../../ai/visa-rejection-analyzer/route';
import { POST as ieltsWritingPost } from '../../ai/ielts/writing/route';
import { POST as ieltsSpeakingPost } from '../../ai/ielts/speaking/route';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type ServiceState = 'operational' | 'degraded' | 'down';

type ServiceSample = {
  t: string;
  state: ServiceState;
  latencyMs: number | null;
  message?: string;
};

type Incident = {
  id: string;
  serviceId: string;
  startedAt: string;
  endedAt: string | null;
  lastState: ServiceState;
  message: string;
};

type ServiceSnapshot = {
  id: string;
  name: string;
  description: string;
  state: ServiceState;
  latencyMs: number | null;
  checkedAt: string;
  uptime24h: number;
  responseP50Ms: number | null;
  message?: string;
  recent: ServiceSample[];
  incidents: Incident[];
};

type StatusResponse = {
  generatedAt: string;
  config: {
    openaiKeyConfigured: boolean;
    mongoConfigured: boolean;
  };
  services: ServiceSnapshot[];
};

const noStore = { 'cache-control': 'no-store' };

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const uid = () => `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;

const percentile = (values: number[], p: number) => {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = clamp(Math.floor((sorted.length - 1) * p), 0, sorted.length - 1);
  return sorted[idx] ?? null;
};

const nowIso = () => new Date().toISOString();

const sampleOrigin = (req: Request) => new URL(req.url).origin;

const makeReq = (origin: string, path: string, body: unknown) =>
  new Request(`${origin}${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify(body)
  });

type CheckResult = { ok: true; state: ServiceState; latencyMs: number; message?: string } | { ok: false; state: ServiceState; latencyMs: number; message: string };

type ServiceDef = {
  id: string;
  name: string;
  description: string;
  check: (origin: string) => Promise<CheckResult>;
};

const safeJson = async (res: Response) => {
  try {
    return (await res.json()) as any;
  } catch {
    return null;
  }
};

const determineState = (res: Response, json: any): ServiceState => {
  if (!res.ok) return 'down';
  if (json && typeof json === 'object' && json.offline === true) return 'degraded';
  return 'operational';
};

const checkWithRetry = async (fn: () => Promise<CheckResult>, tries: number) => {
  let last: CheckResult | null = null;
  for (let i = 0; i < tries; i++) {
    last = await fn();
    if (last.ok) return last;
    await new Promise((r) => setTimeout(r, 120 + i * 180));
  }
  return last || { ok: false, state: 'down', latencyMs: 0, message: 'No result' };
};

const services: ServiceDef[] = [
  {
    id: 'eligibility',
    name: 'Eligibility Assessment',
    description: 'Full-profile eligibility matching',
    check: async (origin) => {
      const start = Date.now();
      const res = await eligibilityPost(
        makeReq(origin, '/api/ai/eligibility', {
          age: 29,
          nationality: 'India',
          educationLevel: "Master's Degree",
          workExperienceYears: 6,
          occupationField: 'Information Technology',
          purpose: 'Work/Employment',
          targetCountries: ['Canada', 'Australia'],
          fundsUsd: 25000
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'Eligibility failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'cv-builder',
    name: 'CV Builder',
    description: 'ATS CV draft generator',
    check: async (origin) => {
      const start = Date.now();
      const res = await cvBuilderPost(
        makeReq(origin, '/api/ai/cv-builder', {
          fullName: 'Test User',
          targetRole: 'Software Engineer',
          location: 'Dubai, UAE',
          yearsExperience: 3,
          industry: 'Technology',
          skills: ['TypeScript', 'React', 'Node.js'],
          experienceNotes: 'Built web apps, improved performance, collaborated with stakeholders.',
          educationNotes: "Master's in Computer Science.",
          projectsNotes: 'Shipped production features and improved reliability.'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'CV builder failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'sop-generator',
    name: 'SOP Generator',
    description: 'Statement of purpose draft generator',
    check: async (origin) => {
      const start = Date.now();
      const res = await sopGeneratorPost(
        makeReq(origin, '/api/ai/sop-generator', {
          language: 'en',
          targetCountry: 'Canada',
          program: 'Master of Computer Science',
          background: 'I have a background in Computer Science and professional experience in software engineering.',
          goals: 'I want to pursue a masters program and build a career in software engineering.',
          achievements: 'Worked on production systems and shipped features.',
          ties: 'Strong professional and family ties.',
          concerns: 'I want a conservative, honest SOP.'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'SOP generator failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'timeline-optimizer',
    name: 'Timeline Optimizer',
    description: 'Milestone plan + buffers',
    check: async (origin) => {
      const start = Date.now();
      const res = await timelinePost(
        makeReq(origin, '/api/ai/timeline-optimizer', {
          country: 'Canada',
          pathway: 'Study',
          startDate: '2026-01-01',
          constraints: 'Conservative plan with buffers.',
          language: 'en'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'Timeline optimizer failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'success-predictor',
    name: 'Success Predictor',
    description: 'Deterministic risk band & estimated success',
    check: async (origin) => {
      const start = Date.now();
      const res = await successPredictorPost(
        makeReq(origin, '/api/ai/success-predictor', {
          country: 'Canada',
          pathway: 'Study',
          age: 25,
          education: "Bachelor's Degree",
          experienceYears: 2,
          englishLevel: 'B2',
          funds: 'Bank statements and sponsor letter',
          travelHistory: 'Compliant travel history',
          ties: 'Family and job ties'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'Success predictor failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'visa-interview-coach',
    name: 'Visa Interview Coach',
    description: 'Mock interview feedback + improved answer',
    check: async (origin) => {
      const start = Date.now();
      const res = await interviewPost(
        makeReq(origin, '/api/ai/visa-interview-coach', {
          country: 'canada',
          questionId: 'canada_study_1',
          answer:
            'I chose this course because it directly builds on my background and the modules match my career plan. I have planned my timeline, funding, and post-study steps carefully and I can explain my documents clearly.',
          language: 'en',
          selfReport: { presenceScore: 78 },
          voiceMetrics: { fillers: 2, wpm: 130 }
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'Interview coach failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'visa-rejection-analyzer',
    name: 'Visa Rejection Analyzer',
    description: 'Refusal letter diagnosis + plan',
    check: async (origin) => {
      const start = Date.now();
      const res = await rejectionPost(
        makeReq(origin, '/api/ai/visa-rejection-analyzer', {
          country: 'Canada',
          pathway: 'Study',
          letterText:
            'We are not satisfied you will leave Canada at the end of your stay. We are not satisfied that you have sufficient funds or that the source of funds is clear. The documents provided are not sufficient.',
          language: 'en'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'Rejection analyzer failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'ielts-writing',
    name: 'IELTS Writing',
    description: 'Band estimate + feedback + 14-day plan',
    check: async (origin) => {
      const start = Date.now();
      const res = await ieltsWritingPost(
        makeReq(origin, '/api/ai/ielts/writing', {
          task: 'task2',
          language: 'en',
          text:
            'Some people believe that working from home increases productivity. I agree that remote work can improve focus when managed well. However, it also requires discipline and clear communication. In this essay, I will explain why a hybrid approach often works best. First, people can avoid commuting time and use that time to rest or plan tasks. For example, software teams can schedule deep work blocks at home and meetings in the office. Second, companies can reduce costs and recruit globally. On the other hand, isolation can harm collaboration if teams do not have strong habits. Therefore, workers should set routines, use clear tools, and meet regularly. In conclusion, remote work can increase productivity, but only when structure and communication are strong.',
          targetBand: 7
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'IELTS writing failed' };
      return { ok: true, state, latencyMs };
    }
  },
  {
    id: 'ielts-speaking',
    name: 'IELTS Speaking',
    description: 'Band estimate + drills',
    check: async (origin) => {
      const start = Date.now();
      const res = await ieltsSpeakingPost(
        makeReq(origin, '/api/ai/ielts/speaking', {
          prompt: 'Describe a book you enjoyed.',
          transcript:
            'I would like to talk about a book that I really enjoyed. It was about a person who moved to a new country and had to adapt. I read it last year, and it made me think about how important it is to keep learning. For example, the main character improved step by step, and as a result she became more confident. In the future, I plan to read more books like this because it helps me with vocabulary and ideas.',
          targetBand: 7,
          language: 'en'
        })
      );
      const latencyMs = Date.now() - start;
      const json = await safeJson(res);
      const state = determineState(res, json);
      if (!res.ok) return { ok: false, state, latencyMs, message: json?.error || 'IELTS speaking failed' };
      return { ok: true, state, latencyMs };
    }
  }
];

const getDb = async () => {
  try {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB || 'vanhsya';
    return client.db(dbName);
  } catch {
    return null;
  }
};

const store = (() => {
  const samplesByService = new Map<string, ServiceSample[]>();
  const incidents: Incident[] = [];
  const lastState = new Map<string, ServiceState>();
  const maxSamples = 240;
  const maxIncidents = 200;

  const pushSample = (serviceId: string, sample: ServiceSample) => {
    const arr = samplesByService.get(serviceId) || [];
    arr.unshift(sample);
    samplesByService.set(serviceId, arr.slice(0, maxSamples));
  };

  const getSamples = (serviceId: string) => samplesByService.get(serviceId) || [];

  const openIncident = (serviceId: string, state: ServiceState, message: string) => {
    const existing = incidents.find((i) => i.serviceId === serviceId && i.endedAt === null) || null;
    if (existing) {
      existing.lastState = state;
      existing.message = message;
      return existing;
    }
    const inc: Incident = { id: uid(), serviceId, startedAt: nowIso(), endedAt: null, lastState: state, message };
    incidents.unshift(inc);
    if (incidents.length > maxIncidents) incidents.splice(maxIncidents);
    return inc;
  };

  const closeIncident = (serviceId: string) => {
    const existing = incidents.find((i) => i.serviceId === serviceId && i.endedAt === null) || null;
    if (!existing) return null;
    existing.endedAt = nowIso();
    existing.lastState = 'operational';
    return existing;
  };

  const updateState = (serviceId: string, next: ServiceState, message?: string) => {
    const prev = lastState.get(serviceId) || 'operational';
    lastState.set(serviceId, next);
    if (next === 'down' && prev !== 'down') openIncident(serviceId, next, message || 'Service down');
    if (next !== 'down' && prev === 'down') closeIncident(serviceId);
  };

  const getIncidents = (serviceId: string) => incidents.filter((i) => i.serviceId === serviceId).slice(0, 10);

  return { pushSample, getSamples, getIncidents, updateState };
})();

const alert = async (payload: unknown) => {
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  } catch {
  }
};

export async function GET(req: Request) {
  const origin = sampleOrigin(req);
  const cfg = ensureAiConfigured();
  const openaiKeyConfigured = cfg.ok;
  const db = await getDb();
  const mongoConfigured = Boolean(db);

  const snapshots: ServiceSnapshot[] = [];

  for (const svc of services) {
    const checkedAt = nowIso();
    const startState = store.getSamples(svc.id)[0]?.state || 'operational';
    const result = await checkWithRetry(() => svc.check(origin), 2);
    const state = result.state;
    const latencyMs = result.latencyMs;
    const message = (result as any).message;

    store.pushSample(svc.id, { t: checkedAt, state, latencyMs: latencyMs ?? null, message });
    store.updateState(svc.id, state, message);

    if (db) {
      try {
        await db.collection('service_samples').insertOne({
          serviceId: svc.id,
          t: checkedAt,
          state,
          latencyMs: latencyMs ?? null,
          message: message || null
        });
      } catch {
      }

      try {
        if (state === 'down') {
          const open = await db.collection('service_incidents').findOne({ serviceId: svc.id, endedAt: null });
          if (open) {
            await db.collection('service_incidents').updateOne(
              { _id: (open as any)._id },
              { $set: { lastState: state, message: message || 'down' } }
            );
          } else {
            await db.collection('service_incidents').insertOne({
              serviceId: svc.id,
              startedAt: checkedAt,
              endedAt: null,
              lastState: state,
              message: message || 'down'
            });
          }
        } else {
          await db
            .collection('service_incidents')
            .updateMany({ serviceId: svc.id, endedAt: null }, { $set: { endedAt: checkedAt, lastState: 'operational' } });
        }
      } catch {
      }
    }

    if (state === 'down' && startState !== 'down') {
      void alert({ kind: 'incident', serviceId: svc.id, name: svc.name, at: checkedAt, message: message || 'down' });
    }

    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const samples = db
      ? await (async () => {
          try {
            return (await db
              .collection('service_samples')
              .find({ serviceId: svc.id, t: { $gte: new Date(cutoff).toISOString() } })
              .sort({ t: -1 })
              .limit(240)
              .toArray()) as any[];
          } catch {
            return [];
          }
        })()
      : store.getSamples(svc.id);

    const incidents = db
      ? await (async () => {
          try {
            const docs = (await db
              .collection('service_incidents')
              .find({ serviceId: svc.id })
              .sort({ startedAt: -1 })
              .limit(10)
              .toArray()) as any[];
            return docs.map((d) => ({
              id: String(d._id),
              serviceId: d.serviceId,
              startedAt: d.startedAt,
              endedAt: d.endedAt ?? null,
              lastState: d.lastState as ServiceState,
              message: d.message
            })) as Incident[];
          } catch {
            return store.getIncidents(svc.id);
          }
        })()
      : store.getIncidents(svc.id);

    const in24h = samples.filter((s: any) => Date.parse(s.t) >= cutoff);
    const upCount = in24h.filter((s) => s.state !== 'down').length;
    const uptime24h = in24h.length ? Math.round((upCount / in24h.length) * 1000) / 10 : 100;
    const okLatencies = in24h.filter((s) => s.latencyMs != null && s.state !== 'down').map((s) => s.latencyMs as number);
    const p50 = percentile(okLatencies, 0.5);

    snapshots.push({
      id: svc.id,
      name: svc.name,
      description: svc.description,
      state,
      latencyMs: latencyMs ?? null,
      checkedAt,
      uptime24h,
      responseP50Ms: p50,
      message,
      recent: samples.slice(0, 60),
      incidents
    });
  }

  const out: StatusResponse = { generatedAt: nowIso(), config: { openaiKeyConfigured, mongoConfigured }, services: snapshots };
  return Response.json(out, { status: 200, headers: noStore });
}
