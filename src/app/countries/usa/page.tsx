import CountryPageTemplate from '@/components/CountryPageTemplate';

const usaData = {
  name: "United States",
  flag: "🇺🇸",
  description: "The United States offers unparalleled opportunities for career growth, world-class education, and innovation. Explore various immigration pathways including EB visas, H-1B, student visas, and more.",
  capital: "Washington, D.C.",
  population: "333 million",
  language: "English",
  currency: "USD",
  heroGradient: "bg-gradient-to-br from-blue-50 to-red-50",
  primaryColor: "blue",
  immigrationTarget: "1.2M+ annually",
  successRate: "78%",
  averageProcessing: "6-24 months",
  programs: [
    {
      name: "H-1B Specialty Occupation",
      description: "For skilled professionals in specialty occupations",
      basePrice: 1710,
      processingTime: "3-6 months",
      popularity: 85,
      requirements: ["Bachelor's degree", "Job offer", "LCA approval", "Specialty occupation"],
      success: "78%",
      icon: "💼"
    },
    {
      name: "EB-1 Extraordinary Ability",
      description: "For individuals with extraordinary ability",
      basePrice: 2805,
      processingTime: "8-12 months",
      popularity: 70,
      requirements: ["Extraordinary ability", "Evidence of achievements", "Job offer/self-petition", "Priority date"],
      success: "85%",
      icon: "🌟"
    },
    {
      name: "F-1 Student Visa",
      description: "Study at US universities and colleges",
      basePrice: 350,
      processingTime: "2-8 weeks",
      popularity: 95,
      requirements: ["I-20 form", "SEVIS fee", "Financial proof", "Academic credentials"],
      success: "92%",
      icon: "🎓"
    },
    {
      name: "EB-5 Investor Visa",
      description: "Investment-based permanent residence",
      basePrice: 11000,
      processingTime: "24-36 months",
      popularity: 60,
      requirements: ["$800K-1.05M investment", "Job creation", "Business plan", "Source of funds"],
      success: "88%",
      icon: "💰"
    }
  ],
  benefits: [
    {
      title: "Economic Opportunities",
      description: "World's largest economy with diverse career opportunities",
      icon: "💼"
    },
    {
      title: "Innovation Hub",
      description: "Leading technology and research centers globally",
      icon: "🔬"
    },
    {
      title: "Quality Education",
      description: "Home to top-ranked universities and institutions",
      icon: "🎓"
    },
    {
      title: "Cultural Diversity",
      description: "Melting pot of cultures with opportunities for everyone",
      icon: "🌍"
    }
  ],
  whyChoose: [
    {
      title: "Global Business Hub",
      description: "Center of international business and entrepreneurship"
    },
    {
      title: "Research Excellence",
      description: "Leading in scientific research and technological innovation"
    },
    {
      title: "American Dream",
      description: "Land of opportunities where dreams can become reality"
    },
    {
      title: "Career Growth",
      description: "Excellent career advancement opportunities across all sectors"
    }
  ],
  stats: [
    { value: "0.8%", label: "Population Growth" },
    { value: "1.2M+", label: "Immigrants/Year" },
    { value: "3.7%", label: "Unemployment Rate" },
    { value: "$75,000", label: "Average Salary" }
  ]
};

export default function USAPage() {
  return <CountryPageTemplate countryData={usaData} />;
}

export const metadata = {
  title: "USA Immigration Services - VANHSYA Global Migration",
  description: "Expert USA immigration services. H-1B, EB visas, Student Visa, and more. 78% success rate with professional guidance.",
  keywords: "usa immigration, usa visa, h1b visa, eb visa, usa student visa, usa migration"
};