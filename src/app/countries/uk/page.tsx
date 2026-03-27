import CountryPageTemplate from '@/components/CountryPageTemplate';

const ukData = {
  name: "United Kingdom",
  flag: "🇬🇧",
  description: "The UK offers world-class education, career opportunities, and a rich cultural heritage. Explore various immigration pathways including Skilled Worker, Global Talent, and Student visas.",
  capital: "London",
  population: "67.5 million",
  language: "English",
  currency: "GBP",
  heroGradient: "bg-gradient-to-br from-blue-50 to-red-50",
  primaryColor: "blue",
  immigrationTarget: "300,000+ annually",
  successRate: "89%",
  averageProcessing: "3-8 months",
  programs: [
    {
      name: "Skilled Worker Visa",
      description: "For skilled professionals with job offers from UK employers",
      basePrice: 1420,
      processingTime: "3-8 weeks",
      popularity: 90,
      requirements: ["Job offer", "CoS", "English B1", "Salary £25,600+"],
      success: "92%",
      icon: "💼"
    },
    {
      name: "Global Talent Visa",
      description: "For exceptional individuals in science, tech, arts, and academia",
      basePrice: 623,
      processingTime: "3-8 weeks",
      popularity: 75,
      requirements: ["Exceptional talent/promise", "Endorsement", "English A1", "Maintenance funds"],
      success: "85%",
      icon: "🌟"
    },
    {
      name: "Student Visa",
      description: "Study at UK universities and educational institutions",
      basePrice: 363,
      processingTime: "3-6 weeks",
      popularity: 95,
      requirements: ["CAS", "Financial proof", "English B2", "TB certificate"],
      success: "95%",
      icon: "🎓"
    },
    {
      name: "Graduate Visa",
      description: "2-3 year post-study work visa for UK graduates",
      basePrice: 700,
      processingTime: "2-4 weeks",
      popularity: 88,
      requirements: ["UK degree", "Current student visa", "Maintenance funds", "English knowledge"],
      success: "98%",
      icon: "👨‍🎓"
    }
  ],
  benefits: [
    {
      title: "Global Education Hub",
      description: "Home to world-renowned universities and educational institutions",
      icon: "🎓"
    },
    {
      title: "Strong Economy",
      description: "Major financial center with diverse job opportunities",
      icon: "💰"
    },
    {
      title: "NHS Healthcare",
      description: "National Health Service providing free healthcare",
      icon: "🏥"
    },
    {
      title: "Cultural Heritage",
      description: "Rich history, culture, and English language advantage",
      icon: "🏰"
    }
  ],
  whyChoose: [
    {
      title: "English-Speaking Country",
      description: "Native English-speaking environment ideal for career growth"
    },
    {
      title: "Gateway to Europe",
      description: "Strategic location providing easy access to European markets"
    },
    {
      title: "Innovation Hub",
      description: "Leading technology and financial sectors with career opportunities"
    },
    {
      title: "Multicultural Society",
      description: "Diverse and inclusive society welcoming international talent"
    }
  ],
  stats: [
    { value: "0.7%", label: "Population Growth" },
    { value: "300,000+", label: "Net Migration/Year" },
    { value: "3.8%", label: "Unemployment Rate" },
    { value: "£35,000", label: "Average Salary" }
  ]
};

export default function UKPage() {
  return <CountryPageTemplate countryData={ukData} />;
}

export const metadata = {
  title: "UK Immigration Services - VANHSYA Global Migration",
  description: "Expert UK immigration services. Skilled Worker Visa, Student Visa, Global Talent Visa, and more. 89% success rate with professional guidance.",
  keywords: "uk immigration, uk visa, skilled worker visa, uk student visa, global talent visa, uk migration"
};
