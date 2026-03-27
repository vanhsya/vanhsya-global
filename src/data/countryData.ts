export const countryData = {
  australia: {
    name: "Australia",
    flag: "🇦🇺",
    description: "Discover the land down under with excellent quality of life, world-class education, and abundant career opportunities. Australia welcomes skilled workers, students, and families from around the globe.",
    capital: "Canberra",
    population: "26M",
    language: "English",
    currency: "AUD",
    heroGradient: "bg-gradient-to-br from-green-500 via-yellow-400 to-red-500",
    primaryColor: "green",
    immigrationTarget: "160K",
    successRate: "92%",
    averageProcessing: "8-12 months",
    programs: [
      {
        name: "Skilled Independent (189)",
        description: "Points-based permanent residence for skilled workers",
        basePrice: 3200,
        processingTime: "8-12 months",
        popularity: 88,
        requirements: ["IELTS 6.5+", "Skills assessment", "Points test 65+", "Age under 45"],
        success: "High",
        icon: "🚀"
      },
      {
        name: "Skilled Nominated (190)",
        description: "State nomination pathway for skilled workers",
        basePrice: 3500,
        processingTime: "10-14 months",
        popularity: 85,
        requirements: ["State nomination", "IELTS 6.5+", "Work experience", "Skills assessment"],
        success: "Very High",
        icon: "🏛️"
      },
      {
        name: "Student Visa (500)",
        description: "Study at Australian universities and institutions",
        basePrice: 2200,
        processingTime: "4-8 weeks",
        popularity: 94,
        requirements: ["CoE", "Financial proof", "IELTS 6.0+", "Health insurance"],
        success: "High",
        icon: "🎓"
      },
      {
        name: "Temporary Skill Shortage (482)",
        description: "Work visa for skilled professionals",
        basePrice: 1800,
        processingTime: "2-6 months",
        popularity: 78,
        requirements: ["Job offer", "Skills assessment", "IELTS 5.0+", "Work experience"],
        success: "High",
        icon: "💼"
      },
      {
        name: "Partner Visa (820/801)",
        description: "For spouses and partners of Australian residents",
        basePrice: 2800,
        processingTime: "18-24 months",
        popularity: 82,
        requirements: ["Genuine relationship", "Australian sponsor", "Health checks", "Character test"],
        success: "Very High",
        icon: "❤️"
      },
      {
        name: "Visitor Visa (600)",
        description: "Tourist and business visitor visa",
        basePrice: 600,
        processingTime: "2-3 weeks",
        popularity: 91,
        requirements: ["Passport", "Financial proof", "Health insurance", "Return ticket"],
        success: "High",
        icon: "✈️"
      }
    ],
    provinces: [
      {
        name: "New South Wales",
        capital: "Sydney",
        population: "8.2M",
        programs: ["NSW 190", "NSW 491", "Graduate Entrepreneur"],
        highlights: ["Largest economy", "Sydney harbor", "Tech opportunities"]
      },
      {
        name: "Victoria",
        capital: "Melbourne",
        population: "6.7M",
        programs: ["VIC 190", "VIC 491", "Investor Stream"],
        highlights: ["Cultural capital", "Coffee culture", "Education hub"]
      },
      {
        name: "Queensland",
        capital: "Brisbane",
        population: "5.2M",
        programs: ["QLD 190", "QLD 491", "Business Investment"],
        highlights: ["Great Barrier Reef", "Tourism", "Mining sector"]
      },
      {
        name: "Western Australia",
        capital: "Perth",
        population: "2.7M",
        programs: ["WA 190", "WA 491", "Graduate Stream"],
        highlights: ["Mining industry", "Beautiful beaches", "Growing economy"]
      }
    ],
    benefits: [
      {
        title: "Universal Healthcare",
        description: "Medicare system for residents and citizens",
        icon: "🏥"
      },
      {
        title: "Quality Education",
        description: "World-renowned universities and schools",
        icon: "🎓"
      },
      {
        title: "Work-Life Balance",
        description: "Strong labor laws and leisure culture",
        icon: "⚖️"
      },
      {
        title: "Natural Beauty",
        description: "Diverse landscapes and unique wildlife",
        icon: "🌿"
      }
    ],
    whyChoose: [
      {
        title: "Strong Economy",
        description: "Stable economy with low unemployment rates and high wages"
      },
      {
        title: "Multicultural Society",
        description: "Welcoming communities with people from over 200 countries"
      },
      {
        title: "Excellent Climate",
        description: "Year-round sunshine and outdoor lifestyle opportunities"
      },
      {
        title: "World-Class Healthcare",
        description: "Medicare system providing quality healthcare for all residents"
      }
    ],
    stats: [
      { value: "160,000", label: "Annual Migration Target" },
      { value: "92%", label: "Visa Approval Rate" },
      { value: "8-12", label: "Months Processing" },
      { value: "200+", label: "Countries Represented" }
    ]
  },

  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    description: "Experience the rich history, world-class education, and global business opportunities in the UK. Home to prestigious universities and a gateway to Europe with excellent career prospects.",
    capital: "London",
    population: "67M",
    language: "English",
    currency: "GBP",
    heroGradient: "bg-gradient-to-br from-blue-600 via-white to-red-500",
    primaryColor: "blue",
    immigrationTarget: "300K",
    successRate: "89%",
    averageProcessing: "6-12 months",
    programs: [
      {
        name: "Skilled Worker Visa",
        description: "Work visa for skilled professionals with job offers",
        basePrice: 2800,
        processingTime: "3-8 weeks",
        popularity: 92,
        requirements: ["Job offer", "Certificate of Sponsorship", "IELTS 4.0+", "Salary threshold"],
        success: "High",
        icon: "💼"
      },
      {
        name: "Student Visa",
        description: "Study at UK universities and institutions",
        basePrice: 2400,
        processingTime: "3-6 weeks",
        popularity: 95,
        requirements: ["CAS", "Financial proof", "IELTS 5.5+", "TB test"],
        success: "Very High",
        icon: "🎓"
      },
      {
        name: "Global Talent Visa",
        description: "For leaders and potential leaders in specific fields",
        basePrice: 3500,
        processingTime: "3-8 weeks",
        popularity: 75,
        requirements: ["Endorsement", "Exceptional talent", "Field expertise", "Character requirements"],
        success: "High",
        icon: "🌟"
      },
      {
        name: "Innovator Founder Visa",
        description: "For entrepreneurs with innovative business ideas",
        basePrice: 4200,
        processingTime: "3-8 weeks",
        popularity: 68,
        requirements: ["Business plan", "Endorsement", "Investment funds", "English proficiency"],
        success: "Moderate",
        icon: "🚀"
      },
      {
        name: "Family Visa",
        description: "Join family members who are UK citizens or residents",
        basePrice: 2600,
        processingTime: "12-24 weeks",
        popularity: 86,
        requirements: ["Relationship proof", "Financial requirement", "English test", "Sponsor eligibility"],
        success: "High",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        name: "Visitor Visa",
        description: "Tourism and business visits to the UK",
        basePrice: 750,
        processingTime: "3-6 weeks",
        popularity: 88,
        requirements: ["Passport", "Financial proof", "Purpose of visit", "Return plans"],
        success: "High",
        icon: "✈️"
      }
    ],
    whyChoose: [
      {
        title: "Global Education Hub",
        description: "Home to world's top universities including Oxford and Cambridge"
      },
      {
        title: "Rich Cultural Heritage",
        description: "Museums, theaters, and historical landmarks"
      },
      {
        title: "Gateway to Europe",
        description: "Easy access to European countries and markets"
      },
      {
        title: "NHS Healthcare",
        description: "National Health Service providing free healthcare"
      }
    ],
    stats: [
      { value: "300,000", label: "Annual Visas Issued" },
      { value: "89%", label: "Success Rate" },
      { value: "6-12", label: "Weeks Processing" },
      { value: "150+", label: "Universities" }
    ]
  },

  usa: {
    name: "United States",
    flag: "🇺🇸",
    description: "Pursue the American Dream with endless opportunities in the world's largest economy. From Silicon Valley innovation to Wall Street finance, discover your potential in the land of opportunity.",
    capital: "Washington D.C.",
    population: "331M",
    language: "English",
    currency: "USD",
    heroGradient: "bg-gradient-to-br from-blue-600 via-white to-red-600",
    primaryColor: "blue",
    immigrationTarget: "1.2M",
    successRate: "85%",
    averageProcessing: "12-24 months",
    programs: [
      {
        name: "EB-1 Extraordinary Ability",
        description: "For individuals with extraordinary abilities",
        basePrice: 5500,
        processingTime: "12-18 months",
        popularity: 78,
        requirements: ["Extraordinary ability", "Documentation", "Sustained acclaim", "Recognition"],
        success: "High",
        icon: "🌟"
      },
      {
        name: "H-1B Specialty Occupation",
        description: "Temporary work visa for specialty occupations",
        basePrice: 3200,
        processingTime: "6-12 months",
        popularity: 89,
        requirements: ["Bachelor's degree", "Job offer", "Labor condition", "Specialty occupation"],
        success: "Moderate",
        icon: "💼"
      },
      {
        name: "F-1 Student Visa",
        description: "Study at US universities and colleges",
        basePrice: 2800,
        processingTime: "2-8 weeks",
        popularity: 93,
        requirements: ["I-20 form", "Financial proof", "TOEFL/IELTS", "Academic records"],
        success: "High",
        icon: "🎓"
      },
      {
        name: "EB-5 Investor Program",
        description: "Investment-based permanent residence",
        basePrice: 8500,
        processingTime: "24-36 months",
        popularity: 65,
        requirements: ["$800K investment", "Job creation", "TEA location", "Source of funds"],
        success: "High",
        icon: "💰"
      },
      {
        name: "Family-Based Immigration",
        description: "Join family members who are US citizens or LPRs",
        basePrice: 3800,
        processingTime: "8-24 months",
        popularity: 81,
        requirements: ["Family relationship", "Petitioner eligibility", "Financial support", "Medical exam"],
        success: "High",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        name: "B1/B2 Tourist Visa",
        description: "Tourism and business visitor visa",
        basePrice: 900,
        processingTime: "2-4 weeks",
        popularity: 87,
        requirements: ["DS-160 form", "Interview", "Financial proof", "Strong ties"],
        success: "Moderate",
        icon: "✈️"
      }
    ],
    whyChoose: [
      {
        title: "Economic Powerhouse",
        description: "World's largest economy with endless business opportunities"
      },
      {
        title: "Innovation Hub",
        description: "Leading technology companies and startup ecosystem"
      },
      {
        title: "Educational Excellence",
        description: "Top-ranked universities and research institutions"
      },
      {
        title: "Cultural Diversity",
        description: "Melting pot of cultures with opportunities for all"
      }
    ],
    stats: [
      { value: "1.2M", label: "Annual Immigration" },
      { value: "85%", label: "Overall Success Rate" },
      { value: "12-24", label: "Months Processing" },
      { value: "4,000+", label: "Universities" }
    ]
  },

  germany: {
    name: "Germany",
    flag: "🇩🇪",
    description: "Experience Europe's economic powerhouse with excellent work-life balance, free education, and strong social benefits. Germany offers numerous opportunities for skilled professionals and students.",
    capital: "Berlin",
    population: "83M",
    language: "German",
    currency: "EUR",
    heroGradient: "bg-gradient-to-br from-black via-red-600 to-yellow-400",
    primaryColor: "red",
    immigrationTarget: "400K",
    successRate: "91%",
    averageProcessing: "2-6 months",
    programs: [
      {
        name: "EU Blue Card",
        description: "Work and residence permit for skilled professionals",
        basePrice: 2200,
        processingTime: "2-3 months",
        popularity: 87,
        requirements: ["University degree", "Job offer", "Salary threshold", "Health insurance"],
        success: "Very High",
        icon: "💙"
      },
      {
        name: "Student Visa",
        description: "Study at German universities with low tuition fees",
        basePrice: 1800,
        processingTime: "6-12 weeks",
        popularity: 92,
        requirements: ["Admission letter", "Financial proof", "German/English proficiency", "Health insurance"],
        success: "High",
        icon: "🎓"
      },
      {
        name: "Job Seeker Visa",
        description: "Look for employment opportunities in Germany",
        basePrice: 1200,
        processingTime: "2-6 weeks",
        popularity: 76,
        requirements: ["University degree", "Financial proof", "German knowledge", "Health insurance"],
        success: "Moderate",
        icon: "🔍"
      },
      {
        name: "Family Reunification",
        description: "Join family members residing in Germany",
        basePrice: 1900,
        processingTime: "3-9 months",
        popularity: 84,
        requirements: ["Family relationship", "Sponsor stability", "German knowledge", "Accommodation proof"],
        success: "High",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        name: "Freelancer Visa",
        description: "Self-employment and freelancing opportunities",
        basePrice: 2500,
        processingTime: "2-4 months",
        popularity: 71,
        requirements: ["Business plan", "Financial proof", "Qualifications", "Client contracts"],
        success: "Moderate",
        icon: "💼"
      },
      {
        name: "Tourist Visa",
        description: "Short-term visits for tourism and business",
        basePrice: 500,
        processingTime: "1-2 weeks",
        popularity: 89,
        requirements: ["Passport", "Travel insurance", "Financial proof", "Itinerary"],
        success: "High",
        icon: "✈️"
      }
    ],
    whyChoose: [
      {
        title: "Strong Economy",
        description: "Europe's largest economy with excellent job opportunities"
      },
      {
        title: "Free Education",
        description: "No tuition fees at public universities, even for international students"
      },
      {
        title: "Social Benefits",
        description: "Comprehensive social security and healthcare system"
      },
      {
        title: "Central Location",
        description: "Gateway to Europe with excellent connectivity"
      }
    ],
    stats: [
      { value: "400,000", label: "Annual Immigration" },
      { value: "91%", label: "Visa Success Rate" },
      { value: "2-6", label: "Months Processing" },
      { value: "400+", label: "Universities" }
    ]
  },

  newzealand: {
    name: "New Zealand",
    flag: "🇳🇿",
    description: "Discover the land of the long white cloud with stunning natural beauty, excellent quality of life, and welcoming communities. New Zealand offers unique opportunities for skilled workers and entrepreneurs.",
    capital: "Wellington",
    population: "5.1M",
    language: "English",
    currency: "NZD",
    heroGradient: "bg-gradient-to-br from-blue-600 via-white to-green-600",
    primaryColor: "blue",
    immigrationTarget: "50K",
    successRate: "93%",
    averageProcessing: "6-12 months",
    programs: [
      {
        name: "Skilled Migrant Category",
        description: "Points-based residence for skilled workers",
        basePrice: 2800,
        processingTime: "6-12 months",
        popularity: 89,
        requirements: ["Points system", "IELTS 6.5+", "Work experience", "Age under 55"],
        success: "High",
        icon: "🚀"
      },
      {
        name: "Work to Residence",
        description: "Path to residence through work experience",
        basePrice: 2400,
        processingTime: "3-6 months",
        popularity: 85,
        requirements: ["Job offer", "Work visa", "IELTS 6.5+", "Skilled occupation"],
        success: "Very High",
        icon: "💼"
      },
      {
        name: "Student Visa",
        description: "Study at New Zealand institutions",
        basePrice: 1900,
        processingTime: "4-8 weeks",
        popularity: 91,
        requirements: ["Offer of place", "Financial proof", "IELTS 6.0+", "Health requirements"],
        success: "High",
        icon: "🎓"
      },
      {
        name: "Entrepreneur Work Visa",
        description: "For business owners and entrepreneurs",
        basePrice: 3200,
        processingTime: "3-6 months",
        popularity: 72,
        requirements: ["Business plan", "Investment funds", "IELTS 6.5+", "Business experience"],
        success: "Moderate",
        icon: "🚀"
      },
      {
        name: "Partnership Visa",
        description: "For partners of New Zealand residents",
        basePrice: 2200,
        processingTime: "6-12 months",
        popularity: 88,
        requirements: ["Genuine relationship", "Living together", "IELTS 6.5+", "Sponsor eligibility"],
        success: "Very High",
        icon: "❤️"
      },
      {
        name: "Visitor Visa",
        description: "Tourism and business visits",
        basePrice: 600,
        processingTime: "2-4 weeks",
        popularity: 92,
        requirements: ["Passport", "Financial proof", "Return ticket", "Character requirements"],
        success: "High",
        icon: "✈️"
      }
    ],
    benefits: [
      {
        title: "Natural Paradise",
        description: "Stunning landscapes from mountains to beaches",
        icon: "🏔️"
      },
      {
        title: "Work-Life Balance",
        description: "Excellent quality of life with outdoor lifestyle",
        icon: "⚖️"
      },
      {
        title: "Safe Environment",
        description: "One of the world's safest countries with low crime rates",
        icon: "🛡️"
      },
      {
        title: "Innovation Culture",
        description: "Growing tech sector and startup ecosystem",
        icon: "💡"
      }
    ],
    whyChoose: [
      {
        title: "Natural Paradise",
        description: "Stunning landscapes from mountains to beaches"
      },
      {
        title: "Work-Life Balance",
        description: "Excellent quality of life with outdoor lifestyle"
      },
      {
        title: "Safe Environment",
        description: "One of the world's safest countries with low crime rates"
      },
      {
        title: "Innovation Culture",
        description: "Growing tech sector and startup ecosystem"
      }
    ],
    stats: [
      { value: "50,000", label: "Annual Residence" },
      { value: "93%", label: "Approval Rate" },
      { value: "6-12", label: "Months Processing" },
      { value: "8", label: "Universities" }
    ]
  },

  singapore: {
    name: "Singapore",
    flag: "🇸🇬",
    description: "Experience Asia's financial hub with excellent infrastructure, multicultural society, and strategic location. Singapore offers exceptional opportunities for business, education, and career growth.",
    capital: "Singapore",
    population: "5.9M",
    language: "English",
    currency: "SGD",
    heroGradient: "bg-gradient-to-br from-red-500 via-white to-red-500",
    primaryColor: "red",
    immigrationTarget: "25K",
    successRate: "87%",
    averageProcessing: "2-8 months",
    programs: [
      {
        name: "Employment Pass",
        description: "Work pass for professionals and managers",
        basePrice: 1800,
        processingTime: "1-3 months",
        popularity: 91,
        requirements: ["University degree", "Job offer", "Salary $4,500+", "Work experience"],
        success: "High",
        icon: "💼"
      },
      {
        name: "Student Pass",
        description: "Study at Singapore institutions",
        basePrice: 1400,
        processingTime: "2-4 weeks",
        popularity: 94,
        requirements: ["Acceptance letter", "Financial proof", "IELTS 6.0+", "Medical check"],
        success: "Very High",
        icon: "🎓"
      },
      {
        name: "Tech.Pass",
        description: "For established tech professionals",
        basePrice: 2200,
        processingTime: "2-6 months",
        popularity: 78,
        requirements: ["Tech background", "Salary criteria", "Company criteria", "Points system"],
        success: "Moderate",
        icon: "💻"
      },
      {
        name: "EntrePass",
        description: "For entrepreneurs and innovators",
        basePrice: 2800,
        processingTime: "2-8 months",
        popularity: 69,
        requirements: ["Business plan", "Funding/Investment", "Innovation criteria", "Educational qualifications"],
        success: "Moderate",
        icon: "🚀"
      },
      {
        name: "Dependent Pass",
        description: "For family members of work pass holders",
        basePrice: 1200,
        processingTime: "1-2 months",
        popularity: 89,
        requirements: ["Valid work pass holder", "Salary threshold", "Relationship proof", "Medical check"],
        success: "High",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        name: "Tourist Visa",
        description: "Short-term visits and business trips",
        basePrice: 400,
        processingTime: "1-2 weeks",
        popularity: 95,
        requirements: ["Passport", "Financial proof", "Return ticket", "Purpose of visit"],
        success: "Very High",
        icon: "✈️"
      }
    ],
    benefits: [
      {
        title: "Financial Hub",
        description: "Asia's leading financial and business center",
        icon: "🏦"
      },
      {
        title: "Strategic Location",
        description: "Gateway to Southeast Asia and global markets",
        icon: "🌏"
      },
      {
        title: "Multicultural Society",
        description: "Harmonious blend of cultures and languages",
        icon: "🌈"
      },
      {
        title: "High Living Standards",
        description: "Excellent infrastructure and quality of life",
        icon: "🏙️"
      }
    ],
    whyChoose: [
      {
        title: "Financial Hub",
        description: "Asia's leading financial and business center"
      },
      {
        title: "Strategic Location",
        description: "Gateway to Southeast Asia and global markets"
      },
      {
        title: "Multicultural Society",
        description: "Harmonious blend of cultures and languages"
      },
      {
        title: "High Living Standards",
        description: "Excellent infrastructure and quality of life"
      }
    ],
    stats: [
      { value: "25,000", label: "Annual PR Grants" },
      { value: "87%", label: "Success Rate" },
      { value: "2-8", label: "Months Processing" },
      { value: "6", label: "Universities" }
    ]
  },

  uae: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    description: "Experience the modern Middle East with tax-free income, luxury lifestyle, and business opportunities. The UAE offers golden visa programs and excellent career prospects in a dynamic economy.",
    capital: "Abu Dhabi",
    population: "10M",
    language: "Arabic/English",
    currency: "AED",
    heroGradient: "bg-gradient-to-br from-red-600 via-white to-black",
    primaryColor: "red",
    immigrationTarget: "No Limit",
    successRate: "94%",
    averageProcessing: "1-4 months",
    programs: [
      {
        name: "Golden Visa (10 Years)",
        description: "Long-term residence for investors and professionals",
        basePrice: 4500,
        processingTime: "1-3 months",
        popularity: 86,
        requirements: ["Investment $272K+", "Property ownership", "Professional criteria", "Health insurance"],
        success: "High",
        icon: "🏆"
      },
      {
        name: "Employment Visa",
        description: "Work visa for employed professionals",
        basePrice: 1600,
        processingTime: "2-4 weeks",
        popularity: 93,
        requirements: ["Job offer", "Labor contract", "Educational certificates", "Medical fitness"],
        success: "Very High",
        icon: "💼"
      },
      {
        name: "Student Visa",
        description: "Study at UAE universities and colleges",
        basePrice: 1300,
        processingTime: "2-6 weeks",
        popularity: 89,
        requirements: ["Acceptance letter", "Financial proof", "Educational certificates", "Medical check"],
        success: "High",
        icon: "🎓"
      },
      {
        name: "Investor Visa",
        description: "For real estate and business investors",
        basePrice: 3200,
        processingTime: "1-2 months",
        popularity: 76,
        requirements: ["Investment amount", "Property purchase", "Business setup", "Financial proof"],
        success: "High",
        icon: "💰"
      },
      {
        name: "Family Visa",
        description: "Sponsor family members to join you",
        basePrice: 1800,
        processingTime: "2-8 weeks",
        popularity: 91,
        requirements: ["Sponsor eligibility", "Salary requirement", "Relationship proof", "Medical check"],
        success: "High",
        icon: "👨‍👩‍👧‍👦"
      },
      {
        name: "Tourist Visa",
        description: "Multiple entry tourist and business visa",
        basePrice: 450,
        processingTime: "1-3 days",
        popularity: 97,
        requirements: ["Passport", "Photograph", "Return ticket", "Hotel booking"],
        success: "Very High",
        icon: "✈️"
      }
    ],
    benefits: [
      {
        title: "Tax-Free Income",
        description: "No personal income tax for residents",
        icon: "💰"
      },
      {
        title: "Luxury Lifestyle",
        description: "World-class amenities and infrastructure",
        icon: "🏙️"
      },
      {
        title: "Business Hub",
        description: "Gateway between East and West for business",
        icon: "🌍"
      },
      {
        title: "Cultural Diversity",
        description: "Over 200 nationalities living harmoniously",
        icon: "🌈"
      }
    ],
    whyChoose: [
      {
        title: "Tax-Free Income",
        description: "No personal income tax for residents"
      },
      {
        title: "Luxury Lifestyle",
        description: "World-class amenities and infrastructure"
      },
      {
        title: "Business Hub",
        description: "Gateway between East and West for business"
      },
      {
        title: "Cultural Diversity",
        description: "Over 200 nationalities living harmoniously"
      }
    ],
    stats: [
      { value: "Unlimited", label: "Annual Visas" },
      { value: "94%", label: "Approval Rate" },
      { value: "1-4", label: "Months Processing" },
      { value: "10+", label: "Emirates" }
    ]
  }
};

export type CountryKey = keyof typeof countryData;
