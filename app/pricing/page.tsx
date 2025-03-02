import { AnimatedBackground } from '../components/AnimatedBackground'
import { PricingCard } from '../components/pricing/PricingCard'

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 999,
    description: 'Perfect for beginners starting their AI journey',
    features: [
      '8 Classes (2 hours each weekend)',
      'Weekly Office Hours',
      'Class Recordings',
      'Course Materials',
      'Basic Support',
      'Course Certificate',
      '1 Month Duration'
    ],
    courses: [
      'Linear Algebra',
      'Data Analysis with Python',
      'Database with SQL'
    ]
  },
  {
    id: 'pro',
    name: 'Professional Package',
    price: 1299,
    description: 'Most popular choice for aspiring AI engineers',
    recommended: true,
    features: [
      '8 Classes (2 hours each weekend)',
      'Extended Office Hours',
      'Class Recordings',
      'Course Materials',
      'Priority Support',
      'Project Mentoring',
      'Course Certificate',
      'Professor Recommendation Letter',
      '1 Month Duration'
    ],
    courses: [
      'Machine Learning with Python',
      'Deep Learning with Python',
      'Natural Language Processing'
    ]
  },
  {
    id: 'business',
    name: 'Business Analytics',
    price: 1099,
    description: 'Focused on data analysis and visualization',
    features: [
      '8 Classes (2 hours each weekend)',
      'Weekly Office Hours',
      'Class Recordings',
      'Course Materials',
      'Standard Support',
      'Real-world Projects',
      'Course Certificate',
      'Professor Recommendation Letter',
      '1 Month Duration'
    ],
    courses: [
      'Data Analysis with Python',
      'Data Visualization with Tableau',
      'Database with SQL'
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2493DF] to-purple-500 mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-300">
            Flexible course packages designed to help you achieve your career goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 max-w-2xl mx-auto">
            All packages include: Live online classes, mentoring sessions, hands-on projects, 
            technical support, community access, and completion certificate.
            Contact our course advisors for custom learning plans.
          </p>
        </div>
      </div>
    </div>
  )
} 