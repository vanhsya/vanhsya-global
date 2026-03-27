import CountryPageTemplate from '@/components/CountryPageTemplate';

const germanyData = {
  name: "Germany",
  flag: "🇩🇪",
  description: "Germany offers excellent career opportunities, world-class education, and a high standard of living. Join millions who have made Germany their new home through various immigration pathways.",
  capital: "Berlin",
  population: "83.2 million",
  language: "German",
  currency: "EUR",
  heroGradient: "bg-gradient-to-br from-yellow-50 to-red-50",
  primaryColor: "red",
  immigrationTarget: "400,000+ annually",
  successRate: "88%",
  averageProcessing: "3-12 months",
  programs: [
    {
      name: "EU Blue Card",
      description: "For highly skilled professionals with university degrees",
      basePrice: 140,
      processingTime: "3-6 months",
      popularity: 92,
      requirements: ["University degree", "Job offer €58,400+", "German A1 level", "Work experience"],
      success: "90%",
      icon: "🔵"
    },
    {
      name: "Skilled Immigration Act",
      description: "For skilled workers in all sectors",
      basePrice: 75,
      processingTime: "6-12 months",
      popularity: 85,
      requirements: ["Vocational training", "Job offer", "German B1 level", "Skills recognition"],
      success: "85%",
      icon: "⚙️"
    },
    {
      name: "Job Seeker Visa",
      description: "6-month visa to find employment in Germany",
      basePrice: 75,
      processingTime: "2-4 weeks",
      popularity: 78,
      requirements: ["University degree", "Financial proof €5,000", "German A1", "Health insurance"],
      success: "70%",
      icon: "🔍"
    },
    {
      name: "Student Visa",
      description: "Study at German universities and colleges",
      basePrice: 75,
      processingTime: "4-8 weeks",
      popularity: 95,
      requirements: ["University admission", "Financial proof €11,208", "German B2/English", "Health insurance"],
      success: "95%",
      icon: "🎓"
    }
  ],
  benefits: [
    {
      title: "Strong Economy",
      description: "Europe's largest economy with excellent job opportunities",
      icon: "💼"
    },
    {
      title: "Quality Education",
      description: "Free or low-cost university education for all",
      icon: "🎓"
    },
    {
      title: "Healthcare System",
      description: "Universal healthcare with excellent medical facilities",
      icon: "🏥"
    },
    {
      title: "Central Location",
      description: "Perfect location to explore all of Europe",
      icon: "🌍"
    }
  ],
  whyChoose: [
    {
      title: "Work-Life Balance",
      description: "German culture values work-life balance with generous vacation time"
    },
    {
      title: "Social Security",
      description: "Comprehensive social security system protecting workers and families"
    },
    {
      title: "Innovation Hub",
      description: "Leading technology and engineering sectors with career growth opportunities"
    },
    {
      title: "Cultural Diversity",
      description: "Welcoming multicultural society with international communities"
    }
  ],
  stats: [
    { value: "1.2%", label: "Population Growth" },
    { value: "400,000+", label: "New Residents/Year" },
    { value: "3.1%", label: "Unemployment Rate" },
    { value: "€58,400", label: "Average Salary" }
  ]
};

export default function GermanyPage() {
  return <CountryPageTemplate countryData={germanyData} />;
}

export const metadata = {
  title: "Germany Immigration Services - VANHSYA Global Migration",
  description: "Expert Germany immigration services. EU Blue Card, Student Visa, Job Seeker Visa, and more. 91% success rate with professional guidance.",
  keywords: "germany immigration, germany visa, eu blue card, germany student visa, germany work visa, germany migration"
};
