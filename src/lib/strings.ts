// Centralized UI strings for VANHSYA project
// This file consolidates all user-facing text to facilitate language polishing, translation, and maintenance.

export const strings = {
  // Navigation
  nav: {
    explore: "Explore",
    dashboard: "Dashboard",
    tools: "Tools",
    aiTools: "AI Tools",
    countries: "Countries",
    services: "Services",
    investors: "Investors",
    contact: "Contact",
    about: "About",
    terms: "Terms",
    transparency: "Transparency",
    employers: "Employers",
    portal: "Portal",
    webmail: "Webmail",
    maintenance: "Maintenance",
    home: "Home",
    card: "Card",
    concierge: "Concierge",
    consultation: "Consultation",
    menu: "Menu"
  },

  // Concierge
  concierge: {
    welcome: "Welcome to VANHSYA Concierge. Tell me your goal (study, work, PR, business) and your target country — I’ll guide you step-by-step.",
    suggestions: {
      uaeGoldenVisa: "Am I eligible for UAE Golden Visa?",
      workVisaDocuments: "What documents do I need for a Work Visa?",
      scamPrevention: "How does VANHSYA prevent scams?",
      prCountryHelp: "Help me choose the best country for PR"
    }
  },

  // Sections (used in dropdowns and panels)
  sections: {
    services: "Services",
    countries: "Countries",
    aiTools: "AI Tools",
    expose: "Expose",
    company: "Company",
    whyVanhsya: "Why VANHSYA?",
    vanhsyaVision: "VANHSYA Vision",
    successStories: "Success Stories",
    resources: "Resources",
    investors: "Investors",
    careers: "Careers"
  },

  // Common actions
  actions: {
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    reset: "Reset",
    refresh: "Refresh",
    download: "Download",
    upload: "Upload",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    back: "Back",
    next: "Next",
    previous: "Previous",
    close: "Close",
    open: "Open",
    learnMore: "Learn More",
    getStarted: "Get Started",
    tryNow: "Try Now",
    joinWaitlist: "Join Waitlist",
    contactUs: "Contact Us",
    sendMessage: "Send Message",
    viewTiers: "View tiers",
    immersive3D: "Immersive 3D"
  },

  // UI Feedback
  feedback: {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
    loading: "Loading...",
    pleaseWait: "Please wait",
    noResults: "No results found",
    notFound: "Not found",
    accessDenied: "Access denied",
    confirmation: "Are you sure?",
    confirmDelete: "Are you sure you want to delete this item?",
    confirmAction: "Confirm action",
    changesSaved: "Changes saved successfully",
    operationCompleted: "Operation completed",
    somethingWentWrong: "Something went wrong. Please try again."
  },

  // Forms & Validation
  forms: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    passwordMismatch: "Passwords do not match",
    weakPassword: "Password should be at least 8 characters long",
    minLength: (min: number) => `Minimum ${min} characters required`,
    maxLength: (max: number) => `Maximum ${max} characters allowed`,
    invalidInput: "Invalid input",
    pleaseCorrectErrors: "Please correct the errors below"
  },

  // Pages & Sections
  pages: {
    home: {
      title: "Vanhsya - Global Mobility & Wealth Solutions",
      subtitle: "Your trusted partner for international relocation, investment, and citizenship planning",
      cta: "Start Your Journey"
    },
    about: {
      title: "About Vanhsya",
      subtitle: "Who we are and what we stand for"
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
      formTitle: "Send us a message",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      subjectPlaceholder: "Subject",
      messagePlaceholder: "Your Message"
    }
  },

  // AI Tools common strings
  aiTools: {
    disclaimer: "Results are for informational purposes only and do not constitute legal, financial, or immigration advice.",
    processing: "Processing your request...",
    resultsReady: "Results are ready!",
    noData: "No data available for the selected criteria.",
    tryAgain: "Please try again with different inputs."
  },

  // Eligibility
  eligibility: {
    title: "Eligibility Assessment",
    subtitle: "Check your qualification for various visa and residency programs",
    startAssessment: "Start Assessment",
    assessmentInProgress: "Assessment in progress",
    assessmentComplete: "Assessment complete",
    yourScore: "Your Eligibility Score",
    improveScore: "Ways to improve your score",
    seeDetails: "See detailed breakdown"
  },

  // IELTS Trainer
  ieltsTrainer: {
    title: "IELTS Trainer",
    subtitle: "Prepare for your IELTS exam with AI-powered feedback",
    writing: "Writing",
    speaking: "Speaking",
    bandScore: "Estimated Band Score",
    feedback: "Feedback",
    strengths: "Strengths",
    weaknesses: "Areas for Improvement",
    suggestions: "Suggestions",
    studyPlan: "Personalized Study Plan",
    practiceTest: "Practice Test",
    startPractice: "Start Practice"
  },

  // Visa Tools
  visaTools: {
    title: "Visa Application Tools",
    subtitle: "Simplify your visa application process",
    documentChecklist: "Document Checklist",
    interviewPrep: "Interview Preparation",
    timelinePredictor: "Timeline Predictor",
    rejectionAnalyzer: "Rejection Analyzer"
  },

  // Country Pages
  country: {
    title: "Explore {{country}}",
    subtitle: "Discover visa options, requirements, and opportunities",
    overview: "Overview",
    visaOptions: "Visa Options",
    requirements: "Requirements",
    process: "Application Process",
    costOfLiving: "Cost of Living",
    qualityOfLife: "Quality of Life",
    economy: "Economy & Job Market",
    education: "Education System",
    healthcare: "Healthcare"
  }
};

export default strings;