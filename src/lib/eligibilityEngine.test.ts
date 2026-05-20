import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateEligibility } from './eligibilityEngine.ts';
import { POST as eligibilityPost } from '../app/api/ai/eligibility/route.ts';
import { POST as interviewPost } from '../app/api/ai/visa-interview-coach/route.ts';
import { POST as rejectionPost } from '../app/api/ai/visa-rejection-analyzer/route.ts';
import { POST as timelinePost } from '../app/api/ai/timeline-optimizer/route.ts';
import { POST as ieltsWritingPost } from '../app/api/ai/ielts/writing/route.ts';
import { POST as ieltsSpeakingPost } from '../app/api/ai/ielts/speaking/route.ts';

test('evaluateEligibility returns issues when required fields are missing', () => {
  const report = evaluateEligibility({
    age: 0,
    nationality: '',
    educationLevel: '',
    workExperienceYears: 0,
    occupationField: '',
    purpose: '',
    targetCountries: []
  });
  const fields = new Set(report.issues.map((i) => i.field));
  assert.equal(fields.has('nationality'), true);
  assert.equal(fields.has('educationLevel'), true);
  assert.equal(fields.has('occupationField'), true);
  assert.equal(fields.has('targetCountries'), true);
});

test('evaluateEligibility returns country-ranked results and reacts to IELTS score', () => {
  const base = evaluateEligibility({
    age: 29,
    nationality: 'India',
    currentCountry: 'UAE',
    educationLevel: "Master's Degree",
    fieldOfStudy: 'Computer Science',
    workExperienceYears: 6,
    occupationField: 'Information Technology',
    englishLevel: 'Intermediate',
    purpose: 'Work/Employment',
    timeline: '6-12 months',
    targetCountries: ['Canada', 'Australia'],
    jobOffer: false,
    fundsUsd: 25000,
    relativesInDestination: false
  });
  assert.equal(base.issues.length, 0);
  assert.equal(base.results.length, 2);
  assert.ok(base.results[0].score >= base.results[1].score || base.results[0].countryId !== base.results[1].countryId);

  const upgraded = evaluateEligibility({
    age: 29,
    nationality: 'India',
    currentCountry: 'UAE',
    educationLevel: "Master's Degree",
    fieldOfStudy: 'Computer Science',
    workExperienceYears: 6,
    occupationField: 'Information Technology',
    ieltsOverall: 8,
    purpose: 'Work/Employment',
    timeline: '6-12 months',
    targetCountries: ['Canada', 'Australia'],
    jobOffer: false,
    fundsUsd: 25000,
    relativesInDestination: false
  });
  assert.equal(upgraded.issues.length, 0);
  assert.equal(upgraded.results.length, 2);
  assert.ok(upgraded.results[0].score >= base.results[0].score);
});

test('eligibility API POST returns a destination-aware, profile-aware report (offline mode)', async () => {
  const req = new Request('http://localhost:3000/api/ai/eligibility', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3000' },
    body: JSON.stringify({
      age: 29,
      nationality: 'India',
      currentCountry: 'UAE',
      educationLevel: "Master's Degree",
      fieldOfStudy: 'Computer Science',
      workExperienceYears: 6,
      occupationField: 'Information Technology',
      ieltsOverall: 7.5,
      purpose: 'Work/Employment',
      timeline: '6-12 months',
      targetCountries: ['Canada', 'UK'],
      jobOffer: false,
      fundsUsd: 25000,
      relativesInDestination: false
    })
  });

  const res = await eligibilityPost(req);
  assert.equal(res.status, 200);
  const data = (await res.json()) as any;
  assert.equal(data.ok, true);
  assert.equal(data.offline, true);
  assert.equal(Array.isArray(data.report?.results), true);
  assert.equal(data.report.results.length, 2);

  const best = data.report.results[0];
  assert.equal(best.countryId, 'canada');
  assert.equal(best.matchedSignals.some((s: string) => s.includes('Origin: India')), true);
  assert.equal(best.matchedSignals.some((s: string) => s.includes('Purpose: Work/Employment')), true);
});

test('AI tools endpoints return usable offline responses when AI is not configured', async () => {
  const origin = 'http://localhost:3000';

  const interviewReq = new Request(`${origin}/api/ai/visa-interview-coach`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({
      country: 'canada',
      questionId: 'canada_study_1',
      language: 'en',
      answer:
        'I chose this course because it matches my background and it has clear modules that help my career. I have a clear funding plan and a realistic timeline, and I will follow all rules and return after completion.',
      selfReport: { presenceScore: 75 },
      voiceMetrics: { fillers: 3, wpm: 125 }
    })
  });
  const interviewRes = await interviewPost(interviewReq);
  assert.equal(interviewRes.status, 200);
  const interviewJson = (await interviewRes.json()) as any;
  assert.equal(typeof interviewJson.score?.overall, 'number');
  assert.equal(Array.isArray(interviewJson.feedback), true);

  const rejectionReq = new Request(`${origin}/api/ai/visa-rejection-analyzer`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({
      country: 'Canada',
      pathway: 'Study',
      language: 'en',
      letterText:
        'We are not satisfied you will leave at the end of your stay. The documents provided are not sufficient and the source of funds is unclear.'
    })
  });
  const rejectionRes = await rejectionPost(rejectionReq);
  assert.equal(rejectionRes.status, 200);
  const rejectionJson = (await rejectionRes.json()) as any;
  assert.equal(typeof rejectionJson.summary, 'string');
  assert.equal(Array.isArray(rejectionJson.improvementPlan), true);

  const timelineReq = new Request(`${origin}/api/ai/timeline-optimizer`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({
      country: 'Canada',
      pathway: 'Study',
      startDate: '2026-01-01',
      constraints: 'Conservative plan with buffers.',
      language: 'en'
    })
  });
  const timelineRes = await timelinePost(timelineReq);
  assert.equal(timelineRes.status, 200);
  const timelineJson = (await timelineRes.json()) as any;
  assert.equal(Array.isArray(timelineJson.milestones), true);
  assert.ok(timelineJson.milestones.length >= 10);

  const writingReq = new Request(`${origin}/api/ai/ielts/writing`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({
      task: 'task2',
      language: 'en',
      targetBand: 7,
      text:
        'Some people believe that remote work improves productivity. I agree that it can help people focus and manage time better. However, it requires discipline and clear communication. In this essay, I will explain why a structured hybrid approach is often best. First, workers can reduce commuting time and plan tasks more efficiently. For example, they can do deep work at home and use the office for collaboration. Second, companies can recruit globally and reduce costs. On the other hand, isolation may harm teamwork. Therefore, teams should set routines and use clear tools. In conclusion, remote work can improve productivity when structure is strong.'
    })
  });
  const writingRes = await ieltsWritingPost(writingReq);
  assert.equal(writingRes.status, 200);
  const writingJson = (await writingRes.json()) as any;
  assert.equal(typeof writingJson.bandEstimate, 'number');
  assert.equal(Array.isArray(writingJson.improvements), true);

  const speakingReq = new Request(`${origin}/api/ai/ielts/speaking`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin },
    body: JSON.stringify({
      prompt: 'Describe a book you enjoyed.',
      transcript:
        'I want to talk about a book I enjoyed. It was about a person who moved to a new country and learned new habits. I read it last year, and it made me think about learning step by step. For example, the character practiced every day, so she became more confident. In the future, I plan to read more books like this because it helps my vocabulary.',
      targetBand: 7,
      language: 'en'
    })
  });
  const speakingRes = await ieltsSpeakingPost(speakingReq);
  assert.equal(speakingRes.status, 200);
  const speakingJson = (await speakingRes.json()) as any;
  assert.equal(typeof speakingJson.bandEstimate, 'number');
  assert.equal(Array.isArray(speakingJson.drills), true);
});
