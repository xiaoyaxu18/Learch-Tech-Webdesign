import Image from 'next/image'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from './ui/button'
import { ClientTestimony } from './ClientTestimony'

const testimonials = [
  {
    name: "David Zhang",
    role: "Machine Learning Engineer",
    company: "Google",
    content: "The hands-on approach to machine learning concepts was incredible. I went from understanding basic Python to implementing real ML models. The practical projects helped me understand complex algorithms intuitively.",
    rating: 5,
  },
  {
    name: "Lisa Anderson",
    role: "Data Scientist",
    company: "Microsoft",
    content: "The step-by-step tutorials on neural networks and deep learning were perfect for my learning style. I especially loved how we could experiment with different models right in the browser.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "AI Engineer",
    company: "Meta",
    content: "After completing the course and getting certified, I landed a role as an ML Engineer. The curriculum covered everything from basic statistics to advanced deep learning frameworks. Truly comprehensive!",
    rating: 5,
  },
]

export default function Testimony() {
  return (
    <ClientTestimony>
      <div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2493DF] to-purple-500 mb-4">
              What Our Students Say
            </h1>
            <p className="text-xl text-gray-300">
              Real stories from our alumni who transformed their careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 
                  border border-white/10 hover:border-[#2493DF]/30
                  transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={`/placeholder.svg?height=48&width=48`}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-[#2493DF]/20"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-[#2493DF] transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <div className="flex text-yellow-500 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <blockquote className="mt-4 text-gray-300 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 mb-8">
              Join our community of successful graduates and start your journey today
            </p>
            <Link href="/courses">
              <Button className="bg-[#2493DF] hover:bg-[#2493DF]/90 text-lg px-8">
                Explore Our Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ClientTestimony>
  )
} 