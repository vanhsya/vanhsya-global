export type IeltsBand = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type IeltsWritingRubric = {
  task: 'task1' | 'task2';
  criteria: {
    id: 'taskAchievement' | 'coherenceCohesion' | 'lexicalResource' | 'grammarRangeAccuracy';
    name: string;
    bandDescriptors: Record<IeltsBand, string[]>;
  }[];
};

export const IELTS_WRITING_RUBRICS: IeltsWritingRubric[] = [
  {
    task: 'task2',
    criteria: [
      {
        id: 'taskAchievement',
        name: 'Task Response',
        bandDescriptors: {
          9: ['Fully addresses all parts of the task', 'Position is clear and fully developed', 'Ideas are highly relevant and well supported'],
          8: ['Covers all parts of the task sufficiently', 'Position is clear and well developed', 'Main ideas are relevant and well supported'],
          7: ['Addresses all parts of the task', 'Position is clear throughout', 'Main ideas are extended and supported'],
          6: ['Addresses all parts of the task but may be uneven', 'Position is generally clear', 'Some relevant main ideas but development may be limited'],
          5: ['Addresses the task only partially', 'Position may be unclear or inconsistent', 'Ideas may be repetitive or insufficiently supported'],
          4: ['Responds to the task only minimally', 'Position is unclear', 'Ideas are not adequately developed'],
          3: ['Does not adequately address the task', 'Ideas are limited and unclear'],
          2: ['Barely responds to the task', 'No clear position; very limited content'],
          1: ['Content is irrelevant or extremely limited']
        }
      },
      {
        id: 'coherenceCohesion',
        name: 'Coherence & Cohesion',
        bandDescriptors: {
          9: ['Uses cohesion in such a way that it attracts no attention', 'Paragraphing is logical and effective', 'Sequences information skillfully'],
          8: ['Manages all aspects of cohesion well', 'Paragraphing is logical and appropriate', 'Information is well organized'],
          7: ['Logically organizes information and ideas', 'Uses a range of cohesive devices appropriately', 'Clear progression throughout'],
          6: ['Arranges information coherently with overall progression', 'Cohesive devices may be mechanical or faulty at times', 'Paragraphing may be inconsistent'],
          5: ['Presents information with limited organization', 'Cohesive devices are limited or inaccurate', 'Paragraphing may be inadequate'],
          4: ['Information and ideas are not arranged coherently', 'Limited cohesive devices; repetitive or misleading'],
          3: ['Very limited organization', 'Cohesive devices are rarely used or inaccurate'],
          2: ['Little to no organization', 'Cohesion is minimal'],
          1: ['No organization is evident']
        }
      },
      {
        id: 'lexicalResource',
        name: 'Lexical Resource',
        bandDescriptors: {
          9: ['Uses a wide range of vocabulary with very natural and sophisticated control', 'Rare minor errors only'],
          8: ['Uses a wide range of vocabulary fluently and flexibly', 'Occasional inaccuracies in word choice'],
          7: ['Uses a sufficient range of vocabulary to allow flexibility and precision', 'Some errors in word choice or collocation'],
          6: ['Has an adequate range for the task', 'Attempts less common vocabulary with some inaccuracy'],
          5: ['Uses a limited range of vocabulary', 'Frequent errors may cause some difficulty for the reader'],
          4: ['Uses very limited vocabulary', 'Frequent errors impede understanding'],
          3: ['Vocabulary is extremely limited', 'Errors severely impede understanding'],
          2: ['Only isolated words or memorized phrases'],
          1: ['No usable vocabulary']
        }
      },
      {
        id: 'grammarRangeAccuracy',
        name: 'Grammatical Range & Accuracy',
        bandDescriptors: {
          9: ['Uses a wide range of structures with full flexibility and accuracy', 'Errors are rare'],
          8: ['Uses a wide range of structures with good control', 'Occasional errors'],
          7: ['Uses a variety of complex structures', 'Frequent error-free sentences but some errors persist'],
          6: ['Uses a mix of simple and complex structures', 'Errors occur but rarely reduce communication'],
          5: ['Uses limited range of structures', 'Errors are frequent and may cause difficulty'],
          4: ['Uses very limited structures', 'Errors are pervasive and often impede meaning'],
          3: ['Only simple sentence forms; frequent errors'],
          2: ['Sentence forms are rare and inaccurate'],
          1: ['No sentence forms']
        }
      }
    ]
  }
];

export const IELTS_STUDY_AREAS = [
  'speaking_fluency',
  'speaking_pronunciation',
  'speaking_coherence',
  'writing_task_response',
  'writing_cohesion',
  'writing_vocabulary',
  'writing_grammar',
  'reading_skimming',
  'reading_scanning',
  'listening_details',
  'listening_paraphrase'
] as const;

export type IeltsStudyArea = (typeof IELTS_STUDY_AREAS)[number];

export type IeltsSpeakingCriteriaId = 'fluencyCoherence' | 'lexicalResource' | 'grammarRangeAccuracy' | 'pronunciation';

export const IELTS_SPEAKING_CRITERIA: {
  id: IeltsSpeakingCriteriaId;
  name: string;
  bandDescriptors: Partial<Record<IeltsBand, string[]>>;
}[] = [
  {
    id: 'fluencyCoherence',
    name: 'Fluency & Coherence',
    bandDescriptors: {
      9: ['Speaks fluently with only rare repetition or self-correction', 'Develops topics fully and coherently'],
      8: ['Speaks fluently with occasional repetition or self-correction', 'Develops topics coherently with clear progression'],
      7: ['Speaks at length without noticeable effort', 'Uses a range of connectives and discourse markers'],
      6: ['Maintains flow but may lose coherence at times', 'Some repetition or self-correction affects fluency'],
      5: ['Usually maintains flow but noticeable hesitation and repetition', 'Ideas may not be connected logically']
    }
  },
  {
    id: 'lexicalResource',
    name: 'Lexical Resource',
    bandDescriptors: {
      9: ['Uses precise vocabulary naturally and flexibly', 'Rare minor inaccuracies'],
      8: ['Uses a wide vocabulary flexibly to discuss topics', 'Occasional inaccuracies'],
      7: ['Uses a sufficient range with some flexibility and precision', 'Some inappropriate word choices'],
      6: ['Has enough vocabulary for familiar topics', 'Inaccuracy in less common vocabulary is noticeable'],
      5: ['Limited range; frequent repetition', 'Errors may cause some strain for the listener']
    }
  },
  {
    id: 'grammarRangeAccuracy',
    name: 'Grammatical Range & Accuracy',
    bandDescriptors: {
      9: ['Uses a wide range of structures accurately', 'Errors are rare and hard to spot'],
      8: ['Uses a wide range with good control', 'Occasional errors and slips'],
      7: ['Uses complex structures with some flexibility', 'Errors occur but meaning is generally clear'],
      6: ['Uses a mix of simple and complex sentences', 'Errors occur but rarely reduce communication'],
      5: ['Uses basic sentence forms with limited control', 'Errors are frequent and can affect clarity']
    }
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation',
    bandDescriptors: {
      9: ['Effortless to understand; precise articulation', 'Uses features (stress/intonation) naturally'],
      8: ['Easy to understand; minor lapses only', 'Uses features of pronunciation effectively'],
      7: ['Generally easy to understand', 'Shows some effective use of features'],
      6: ['Generally intelligible, but some strain for the listener', 'Limited control of features'],
      5: ['Often difficult to understand', 'Limited control; frequent mispronunciations']
    }
  }
];

export type IeltsAdaptiveModule = {
  id: string;
  area: IeltsStudyArea;
  title: string;
  drills: string[];
};

export const IELTS_ADAPTIVE_MODULES: IeltsAdaptiveModule[] = [
  {
    id: 'spk_fluency_1',
    area: 'speaking_fluency',
    title: 'Reduce fillers and pauses',
    drills: ['Record 60 seconds; remove “um/uh/like” in the next attempt', 'Use 2-second planning before speaking', 'Shadow a native speaker clip for rhythm']
  },
  {
    id: 'spk_coherence_1',
    area: 'speaking_coherence',
    title: 'Answer with structure (PREP / STAR)',
    drills: ['Use PREP (Point-Reason-Example-Point) for opinions', 'Use STAR (Situation-Task-Action-Result) for experiences', 'Add 2 discourse markers per answer']
  },
  {
    id: 'spk_pron_1',
    area: 'speaking_pronunciation',
    title: 'Clarity and stress',
    drills: ['Read aloud and mark stress in content words', 'Practice minimal pairs for common confusions', 'Slow down on endings and past tense forms']
  },
  {
    id: 'wr_task_1',
    area: 'writing_task_response',
    title: 'Stronger thesis and topic sentences',
    drills: ['Write 3 thesis variations for one prompt', 'Draft 4 topic sentences with clear stance', 'Add one specific example per paragraph']
  },
  {
    id: 'wr_cohesion_1',
    area: 'writing_cohesion',
    title: 'Cohesion without over-linking',
    drills: ['Use referencing (this/these) to connect ideas', 'Replace repeated connectors with reformulation', 'Check paragraph unity: one controlling idea']
  },
  {
    id: 'wr_vocab_1',
    area: 'writing_vocabulary',
    title: 'Precise vocabulary and collocations',
    drills: ['Create a collocation list for your topic set', 'Rewrite sentences using more precise verbs', 'Avoid memorized phrases; use natural alternatives']
  },
  {
    id: 'wr_grammar_1',
    area: 'writing_grammar',
    title: 'Complexity with accuracy',
    drills: ['Write 10 complex sentences; then simplify and compare', 'Control clauses: because/although/which/that', 'Edit for tense consistency and agreement']
  }
];
