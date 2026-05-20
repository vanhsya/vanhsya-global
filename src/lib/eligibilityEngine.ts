import { countries as DESTINATIONS } from './countries.ts';

export type EligibilityProfile = {
  age: number;
  nationality: string;
  currentCountry?: string;
  educationLevel: string;
  fieldOfStudy?: string;
  workExperienceYears: number;
  occupationField: string;
  englishLevel?: string;
  ieltsOverall?: number;
  jobOffer?: boolean;
  fundsUsd?: number;
  relativesInDestination?: boolean;
  purpose: string;
  timeline?: string;
  targetCountries: string[];
  notes?: string;
};

export type EligibilityIssue = { field: keyof EligibilityProfile | 'profile'; message: string };

export type EligibilityResult = {
  countryId: string;
  country: string;
  flag: string;
  score: number;
  probability: 'Very High' | 'High' | 'Moderate' | 'Low';
  matchedSignals: string[];
  gaps: string[];
  recommendedPrograms: string[];
  nextSteps: string[];
  estimatedTime: string;
};

export type EligibilityReport = {
  normalized: {
    nationality: string | null;
    currentCountry: string | null;
    targets: string[];
  };
  issues: EligibilityIssue[];
  results: EligibilityResult[];
};

const normalize = (v: string) =>
  v
    .toLowerCase()
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const looksLikeCountryName = (value: string) => {
  const s = value.trim();
  if (s.length < 2 || s.length > 80) return false;
  if (/\d/.test(s)) return false;
  return /^[A-Za-z][A-Za-z\s.'-]*$/.test(s);
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const findDestination = (name: string) => {
  const q = normalize(name);
  if (!q) return null;
  const direct = DESTINATIONS.find((c) => normalize(c.name) === q) ?? null;
  if (direct) return direct;
  const byId = DESTINATIONS.find((c) => normalize(c.id) === q) ?? null;
  if (byId) return byId;
  const aliases: Record<string, string> = {
    'united states': 'usa',
    'united states of america': 'usa',
    america: 'usa',
    uk: 'uk',
    uae: 'uae',
    'united arab emirates': 'uae',
    'new zealand': 'new-zealand'
  };
  const aliased = aliases[q];
  if (aliased) return DESTINATIONS.find((c) => c.id === aliased) ?? null;
  return null;
};

const parseIelts = (value: unknown) => {
  const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 9) return null;
  return Math.round(n * 10) / 10;
};

const englishToIelts = (englishLevel?: string) => {
  const s = normalize(englishLevel || '');
  if (!s) return null;
  if (s.includes('8')) return 8;
  if (s.includes('7')) return 7;
  if (s.includes('6')) return 6;
  if (s.includes('native') || s.includes('fluent')) return 8;
  if (s.includes('advanced')) return 7;
  if (s.includes('intermediate')) return 6;
  if (s.includes('beginner')) return 5;
  return null;
};

const educationScore = (level: string) => {
  const s = normalize(level);
  if (s.includes('phd') || s.includes('doctor')) return 25;
  if (s.includes('master')) return 22;
  if (s.includes('bachelor')) return 19;
  if (s.includes('diploma') || s.includes('certificate') || s.includes('professional')) return 14;
  if (s.includes('high')) return 8;
  return 10;
};

const occupationSignals = (field: string) => {
  const s = normalize(field);
  const hot = ['information technology', 'software', 'it', 'engineering', 'healthcare', 'nursing', 'finance', 'skilled trades'];
  const ok = ['business', 'management', 'education', 'data', 'security', 'construction'];
  if (hot.some((x) => s.includes(normalize(x)))) return { score: 10, label: 'Occupation field aligns with high-demand categories' };
  if (ok.some((x) => s.includes(normalize(x)))) return { score: 6, label: 'Occupation field aligns with common skilled categories' };
  return { score: 3, label: 'Occupation field requires program-specific matching' };
};

const ageScore = (age: number) => {
  if (age >= 18 && age <= 35) return 25;
  if (age <= 40) return 20;
  if (age <= 45) return 16;
  if (age <= 55) return 10;
  return 6;
};

const experienceScore = (years: number) => {
  if (years >= 10) return 20;
  if (years >= 6) return 18;
  if (years >= 4) return 15;
  if (years >= 2) return 10;
  if (years >= 1) return 6;
  return 2;
};

const fundsSignal = (fundsUsd?: number) => {
  const n = typeof fundsUsd === 'number' && Number.isFinite(fundsUsd) ? fundsUsd : null;
  if (n == null) return { score: 0, label: 'Funds not provided' };
  if (n >= 25000) return { score: 8, label: 'Funds appear sufficient for common proof-of-funds thresholds' };
  if (n >= 12000) return { score: 4, label: 'Funds may be sufficient for some pathways; depends on family size and destination' };
  return { score: 1, label: 'Funds likely insufficient for many pathways; consider savings plan or sponsorship options' };
};

const probabilityLabel = (score: number): EligibilityResult['probability'] => {
  if (score >= 82) return 'Very High';
  if (score >= 68) return 'High';
  if (score >= 52) return 'Moderate';
  return 'Low';
};

const estimateTime = (countryId: string, purpose: string) => {
  const p = normalize(purpose);
  const c = DESTINATIONS.find((x) => x.id === countryId) ?? null;
  if (!c) return 'Varies';
  if (p.includes('study')) return c.processingTimes?.['study-visa'] ?? 'Varies';
  if (p.includes('tour')) return c.processingTimes?.['tourist-visa'] ?? 'Varies';
  if (p.includes('permanent') || p.includes('pr')) return c.processingTimes?.['permanent-residence'] ?? 'Varies';
  if (p.includes('work') || p.includes('employment')) return c.processingTimes?.['work-visa'] ?? 'Varies';
  return 'Varies';
};

const programsFor = (countryId: string, purpose: string) => {
  const p = normalize(purpose);
  if (countryId === 'canada') {
    if (p.includes('study')) return ['Study Permit', 'Post-Graduation Work Permit (pathway)', 'Provincial pathways after study'];
    if (p.includes('work')) return ['Express Entry (Skilled Worker)', 'Provincial Nominee Program (PNP)', 'Employer-supported work permit'];
    if (p.includes('business') || p.includes('invest')) return ['Start-up Visa', 'PNP Entrepreneur streams', 'Work permit + PR pathway'];
    return ['Express Entry', 'PNP', 'Visitor visa + long-term plan'];
  }
  if (countryId === 'australia') {
    if (p.includes('study')) return ['Student Visa (Subclass 500)', 'Graduate Visa (pathway)', 'Regional study strategy'];
    if (p.includes('work') || p.includes('permanent')) return ['SkillSelect (Skilled Independent)', 'State Nomination', 'Employer Nomination Scheme'];
    if (p.includes('business') || p.includes('invest')) return ['Business Innovation & Investment', 'Global Talent (if eligible)', 'Employer-sponsored options'];
    return ['SkillSelect', 'Student route', 'Visitor planning'];
  }
  if (countryId === 'uk') {
    if (p.includes('study')) return ['Student Visa', 'Graduate route (pathway)', 'Scholarship and CAS preparation'];
    if (p.includes('work') || p.includes('employment')) return ['Skilled Worker Visa', 'Health and Care Worker Visa (if applicable)', 'Global Talent (if eligible)'];
    if (p.includes('business')) return ['Innovator Founder (if applicable)', 'Skilled Worker + business plan'];
    return ['Skilled Worker', 'Student route'];
  }
  if (countryId === 'usa') {
    if (p.includes('study')) return ['F-1 Student Visa', 'OPT (pathway)', 'STEM OPT (if applicable)'];
    if (p.includes('work') || p.includes('employment')) return ['H-1B (employer lottery)', 'L-1 (intra-company transfer)', 'O-1 (extraordinary ability)'];
    if (p.includes('business') || p.includes('invest')) return ['EB-5 (investment)', 'E-2 (treaty-based, if eligible)', 'L-1 new office strategy'];
    return ['Visitor planning', 'F-1 / H-1B strategy'];
  }
  if (countryId === 'germany') {
    if (p.includes('study')) return ['Student Visa', 'Job-seeker (after study, if applicable)', 'Work permit after graduation'];
    return ['EU Blue Card', 'Skilled Worker Visa', 'Job-seeker visa (if applicable)'];
  }
  if (countryId === 'new-zealand') {
    if (p.includes('study')) return ['Student Visa', 'Post-study work (pathway)', 'Skilled residence planning'];
    return ['Skilled Migrant Category (SMC)', 'Accredited Employer Work Visa', 'Regional strategies'];
  }
  if (countryId === 'singapore') {
    if (p.includes('study')) return ['Student Pass', 'Graduate route planning', 'Employer sponsorship planning'];
    return ['Employment Pass (EP)', 'S Pass (if applicable)', 'EntrePass (if applicable)'];
  }
  if (countryId === 'uae') {
    if (p.includes('study')) return ['Student Residence (institution-sponsored)', 'Post-study employment strategy'];
    if (p.includes('work')) return ['Employment Visa', 'Golden Visa (if eligible)', 'Freelance/remote visa strategy'];
    if (p.includes('business') || p.includes('invest')) return ['Business setup + residence', 'Golden Visa (investor)', 'Partner/owner residence'];
    return ['Tourist/visit + long-term plan', 'Residence options'];
  }
  return ['Skilled migration pathways', 'Study pathways', 'Employer-sponsored pathways'];
};

const purposeFlags = (purpose: string) => {
  const p = normalize(purpose);
  return {
    isStudy: p.includes('study'),
    isWork: p.includes('work') || p.includes('employment'),
    isPr: p.includes('permanent') || p === 'pr' || p.includes('residence'),
    isBusiness: p.includes('business') || p.includes('invest') || p.includes('entrepreneur'),
    isTour: p.includes('tour') || p.includes('visit') || p.includes('travel')
  };
};

const destinationFit = (
  profile: EligibilityProfile,
  countryId: string,
  flags: ReturnType<typeof purposeFlags>,
  ielts: number | null
) => {
  let modifier = 0;
  const notes: string[] = [];
  const gaps: string[] = [];

  if (flags.isWork) {
    if (!profile.jobOffer && (countryId === 'uk' || countryId === 'singapore' || countryId === 'usa')) {
      modifier -= 7;
      gaps.push('Work routes here are usually sponsor-driven; a verified job offer is often required.');
    }
    if (profile.jobOffer && (countryId === 'uk' || countryId === 'singapore' || countryId === 'uae' || countryId === 'usa')) {
      modifier += 4;
      notes.push('Job offer improves sponsor-based pathways for this destination.');
    }
  }

  if (flags.isStudy) {
    const funds = typeof profile.fundsUsd === 'number' && Number.isFinite(profile.fundsUsd) ? profile.fundsUsd : null;
    if (funds != null) {
      if (funds < 12000 && (countryId === 'usa' || countryId === 'uk' || countryId === 'australia' || countryId === 'singapore')) {
        modifier -= 6;
        gaps.push('Proof-of-funds thresholds are often higher here (tuition + living costs).');
      } else if (funds >= 25000 && (countryId === 'usa' || countryId === 'uk' || countryId === 'australia' || countryId === 'canada')) {
        modifier += 3;
        notes.push('Funds appear more aligned with common study visa financial requirements here.');
      }
    }
    if (!profile.fieldOfStudy?.trim()) {
      modifier -= 2;
      gaps.push('Field of study helps align course selection, SOP, and visa narrative.');
    }
  }

  if (flags.isPr) {
    if (profile.workExperienceYears >= 3 && profile.age >= 18 && profile.age <= 35) {
      if (countryId === 'canada' || countryId === 'australia' || countryId === 'new-zealand') {
        modifier += 3;
        notes.push('This destination often favors younger skilled profiles for PR pathways.');
      }
    }
  }

  if (ielts != null && ielts >= 7 && (countryId === 'canada' || countryId === 'australia' || countryId === 'uk' || countryId === 'new-zealand')) {
    modifier += 2;
    notes.push('Stronger English scores tend to improve competitiveness for this destination.');
  }

  if (profile.relativesInDestination && (countryId === 'canada' || countryId === 'usa' || countryId === 'uk' || countryId === 'australia')) {
    modifier += 1;
    notes.push('Family ties can support certain eligibility factors depending on the pathway.');
  }

  return { modifier, notes, gaps };
};

const nextStepsFor = (countryId: string, purpose: string, profile: EligibilityProfile) => {
  const flags = purposeFlags(purpose);
  const name = DESTINATIONS.find((x) => x.id === countryId)?.name || countryId;

  if (countryId === 'canada') {
    if (flags.isWork || flags.isPr) {
      return [
        'Get an ECA (education credential assessment) and a language test result for scoring.',
        'Draft an Express Entry strategy and shortlist PNP streams aligned to your occupation.',
        `Review ${name} proof-of-funds requirements and prepare supporting bank/asset evidence.`
      ];
    }
    if (flags.isStudy) {
      return [
        'Finalize program + DLI selection and collect offer letter/CAS-equivalent paperwork.',
        'Prepare proof-of-funds and SOP that matches your field, goals, and ties.',
        'Create a document checklist (passport, education, experience, finances) and submit.'
      ];
    }
  }

  if (countryId === 'australia') {
    if (flags.isWork || flags.isPr) {
      return [
        'Identify your ANZSCO occupation and check eligibility for skills assessment.',
        'Prepare SkillSelect EOI with evidence for points (age, education, experience, English).',
        'Shortlist state nomination options and align documents to their occupation lists.'
      ];
    }
  }

  if (countryId === 'uk') {
    if (flags.isWork) {
      return [
        'Identify a licensed sponsor and confirm salary threshold for the role.',
        'Prepare English proof and required documents for a Skilled Worker application.',
        'Validate timelines: start date, CoS issuance, and visa processing window.'
      ];
    }
    if (flags.isStudy) {
      return [
        'Secure CAS from your institution and verify tuition + living cost funds evidence.',
        'Draft a clear study narrative aligned to your background and post-study plans.',
        'Collect core documents and apply with accurate travel and education history.'
      ];
    }
  }

  if (countryId === 'usa') {
    if (flags.isWork) {
      return [
        'Confirm your intended work route (H-1B, L-1, O-1) and employer sponsorship readiness.',
        'Prepare degree and experience evidence aligned to the specific petition category.',
        `Align your timeline (${profile.timeline || 'your target window'}) with filing windows and employer processes.`
      ];
    }
    if (flags.isStudy) {
      return [
        'Secure I-20, pay SEVIS, and prepare DS-160 + interview documentation.',
        'Strengthen financial evidence and ties narrative for interview readiness.',
        'Align course selection and career plan to your field of study and background.'
      ];
    }
  }

  if (countryId === 'germany') {
    if (flags.isWork || flags.isPr) {
      return [
        'Check recognition of qualifications and whether a Blue Card route applies.',
        'Prepare proof of experience, salary expectations, and German/English language evidence.',
        'Build a job search plan and document set aligned to your occupation and industry.'
      ];
    }
  }

  return [
    `Open ${name} requirements and verify visa category fit for your purpose.`,
    'Prepare core documents (passport, education, experience, funds) matching your profile details.',
    'Book a consultation for a program-specific strategy and risk review.'
  ];
};

export const evaluateEligibility = (profile: EligibilityProfile): EligibilityReport => {
  const issues: EligibilityIssue[] = [];

  const age = Number.isFinite(profile.age) ? Math.floor(profile.age) : NaN;
  if (!Number.isFinite(age) || age < 0 || age > 120) issues.push({ field: 'age', message: 'Age is invalid.' });

  const nationality = profile.nationality?.trim() || '';
  if (!nationality) issues.push({ field: 'nationality', message: 'Country of origin (nationality) is required.' });
  else if (!looksLikeCountryName(nationality)) issues.push({ field: 'nationality', message: 'Nationality does not look like a valid country name.' });

  const educationLevel = profile.educationLevel?.trim() || '';
  if (!educationLevel) issues.push({ field: 'educationLevel', message: 'Education level is required.' });

  const occupationField = profile.occupationField?.trim() || '';
  if (!occupationField) issues.push({ field: 'occupationField', message: 'Occupation field is required.' });

  const exp = Number.isFinite(profile.workExperienceYears) ? profile.workExperienceYears : NaN;
  if (!Number.isFinite(exp) || exp < 0 || exp > 60) issues.push({ field: 'workExperienceYears', message: 'Work experience years is invalid.' });

  const purpose = profile.purpose?.trim() || '';
  if (!purpose) issues.push({ field: 'purpose', message: 'Purpose is required to match the right pathway.' });

  const targets = Array.isArray(profile.targetCountries) ? profile.targetCountries : [];
  if (!targets.length) issues.push({ field: 'targetCountries', message: 'Select at least one target country.' });

  const resolvedTargets = targets.map((t) => ({ raw: t, dest: findDestination(t) }));
  const normalizedTargets = resolvedTargets.filter((t) => t.dest).map((t) => (t.dest as any).id as string);
  const unrecognizedTargets = resolvedTargets.map((t) => t.raw).filter((t, i) => !resolvedTargets[i]?.dest && typeof t === 'string' && t.trim());

  const normalizedNationality = findDestination(nationality);
  const normalizedCurrent = profile.currentCountry ? findDestination(profile.currentCountry) : null;
  if (profile.currentCountry?.trim() && !looksLikeCountryName(profile.currentCountry.trim())) {
    issues.push({ field: 'currentCountry', message: 'Current country does not look like a valid country name.' });
  }

  const ielts = parseIelts(profile.ieltsOverall) ?? englishToIelts(profile.englishLevel);
  const flags = purposeFlags(purpose);

  const baseScore =
    ageScore(age) +
    educationScore(educationLevel) +
    experienceScore(exp) +
    (ielts == null ? 8 : ielts >= 8 ? 20 : ielts >= 7 ? 16 : ielts >= 6 ? 12 : ielts >= 5 ? 8 : 4) +
    occupationSignals(occupationField).score +
    (profile.jobOffer ? 6 : 0) +
    fundsSignal(profile.fundsUsd).score +
    (profile.relativesInDestination ? 3 : 0);

  const results: EligibilityResult[] = normalizedTargets.map((id) => {
    const c = DESTINATIONS.find((x) => x.id === id) ?? null;
    const flag = c?.flag || '🌍';
    const matchedSignals: string[] = [];
    const gaps: string[] = [];

    matchedSignals.push(`Origin: ${nationality}`);
    if (profile.currentCountry?.trim()) matchedSignals.push(`Current location: ${profile.currentCountry.trim()}`);
    matchedSignals.push(`Purpose: ${purpose}`);
    if (profile.timeline?.trim()) matchedSignals.push(`Timeline: ${profile.timeline.trim()}`);
    if (profile.fieldOfStudy?.trim()) matchedSignals.push(`Field of study: ${profile.fieldOfStudy.trim()}`);
    if (profile.notes?.trim()) matchedSignals.push('Additional notes provided');

    matchedSignals.push(`Age: ${age}`);
    matchedSignals.push(`Education: ${educationLevel}`);
    matchedSignals.push(`Experience: ${exp} years`);
    if (ielts != null) matchedSignals.push(`English: IELTS ~${ielts}`);
    else gaps.push('Provide IELTS (overall) or a precise English level for better matching.');

    const occ = occupationSignals(occupationField);
    matchedSignals.push(occ.label);

    const f = fundsSignal(profile.fundsUsd);
    if (f.score > 0) matchedSignals.push(f.label);
    else gaps.push(f.label);

    if (profile.jobOffer) matchedSignals.push('Job offer: provided');
    else gaps.push('A job offer can significantly improve work visa options in some countries.');

    if (profile.purpose && normalize(profile.purpose).includes('permanent') && exp < 1) {
      gaps.push('For permanent residence pathways, more skilled work experience usually improves outcomes.');
    }

    const fit = destinationFit(profile, id, flags, ielts);
    for (const n of fit.notes) matchedSignals.push(n);
    for (const g of fit.gaps) gaps.push(g);

    const score = clamp(Math.round(baseScore + fit.modifier), 0, 100);
    const probability = probabilityLabel(score);

    return {
      countryId: id,
      country: c?.name || id,
      flag,
      score,
      probability,
      matchedSignals,
      gaps,
      recommendedPrograms: programsFor(id, purpose),
      nextSteps: nextStepsFor(id, purpose, profile),
      estimatedTime: estimateTime(id, purpose)
    };
  });

  results.sort((a, b) => b.score - a.score);

  if (unrecognizedTargets.length) {
    const sample = unrecognizedTargets.slice(0, 4).join(', ');
    const suffix = unrecognizedTargets.length > 4 ? '…' : '';
    issues.push({ field: 'targetCountries', message: `Some selected countries were not recognized: ${sample}${suffix}` });
  }

  const normalizedTargetNames = results.map((r) => r.country);

  return {
    normalized: {
      nationality: normalizedNationality?.name ?? (nationality || null),
      currentCountry: normalizedCurrent?.name ?? (profile.currentCountry?.trim() || null),
      targets: normalizedTargetNames
    },
    issues,
    results
  };
};
