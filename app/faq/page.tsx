import { AnimatedBackground } from '../components/AnimatedBackground'
import { FAQItem } from '../components/faq/FAQAccordion'

const faqs = [
  {
    question: "What is the class schedule like?",
    answer: "Classes are held on weekends, with each session lasting 2 hours. Each course consists of 8 sessions over one month. We also provide weekly office hours for additional support and questions."
  },
  {
    question: "How are the classes conducted?",
    answer: "Classes are conducted live online through our interactive learning platform. Each session includes theoretical concepts, practical demonstrations, and hands-on exercises. All sessions are recorded and available for review."
  },
  {
    question: "What prerequisites are required?",
    answer: "For basic courses like Linear Algebra and Python Programming, no prior experience is required. For advanced courses like Machine Learning and Deep Learning, basic programming knowledge and mathematical foundations are recommended."
  },
  {
    question: "Can I get a refund if I'm not satisfied?",
    answer: "Yes, we offer a 100% refund if you decide to withdraw within the first week of the course. Please contact our support team for the refund process."
  },
  {
    question: "Do you provide job placement assistance?",
    answer: "While we don't guarantee job placement, we provide valuable resources including professor recommendation letters, project experience, and a strong alumni network that can help in your career journey."
  },
  {
    question: "What kind of support is available outside class hours?",
    answer: "We offer weekly office hours, access to our learning community platform, and technical support through our dedicated support channels. Advanced packages include extended office hours and priority support."
  },
  {
    question: "Are the course materials available after the course ends?",
    answer: "Yes, you will have lifetime access to the course materials, including recorded sessions, slides, and code examples. You can review the content anytime after course completion."
  },
  {
    question: "How do I receive my certificate and recommendation letter?",
    answer: "Certificates are issued upon successful completion of the course. For eligible packages, recommendation letters are provided based on your performance and engagement throughout the course."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1C1D24] to-[#2C2D34] relative overflow-hidden">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/30 z-10" />
      
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2493DF] to-purple-500 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300">
            Find answers to common questions about our courses and learning experience
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Still have questions?{' '}
            <a 
              href="mailto:support@svai.edu"
              className="text-[#2493DF] hover:underline"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 