import { motion } from 'framer-motion'
import { Code, Globe, TrendingUp, Zap, Shield, Users, BarChart3, Clock, Heart, Share2, Image, Settings } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import GlassCard from '@/components/GlassCard'
import NeonButton from '@/components/NeonButton'
import ServiceCard from '@/components/ServiceCard'
import { PricingTier } from '@/components/ServiceCard'
import ReviewsCarouselWithGoogle from '@/components/ReviewsCarouselWithGoogle'

const services: Array<{
  title: string
  description: string
  icon: React.ReactNode
  tiers?: PricingTier[]
}> = [
  {
    title: 'Custom Websites',
    description: 'Stunning, responsive websites tailored to your brand that convert visitors into customers.',
    icon: <Globe />,
  },
  {
    title: 'Web Applications',
    description: 'Powerful web apps with seamless user experiences that streamline your business operations.',
    icon: <Code />,
  },
  {
    title: 'Google Ads',
    description: 'Data-driven campaigns that maximize your ROI and put you in front of the right audience.',
    icon: <TrendingUp />,
  },
  {
    title: 'Social Media Ads',
    description: 'Engaging social campaigns that build brand awareness and drive meaningful engagement.',
    icon: <Share2 />,
  },
  {
    title: 'Graphic Design',
    description: 'Eye-catching visuals and marketing materials that make your brand unforgettable.',
    icon: <Image />,
  },
  {
    title: 'Maintenance',
    description: 'Reliable ongoing support to keep your digital presence secure, fast, and up-to-date.',
    icon: <Settings />,
  },
]

const whyChooseUs = [
  {
    icon: <Zap />,
    title: 'Lightning Fast Delivery',
    description: 'We move quickly without sacrificing quality. Your project launches on time, every time.',
  },
  {
    icon: <Shield />,
    title: 'Built to Last',
    description: 'Security and performance are baked in from day one. Your digital assets are protected.',
  },
  {
    icon: <Users />,
    title: 'Dedicated Support',
    description: 'A real team behind your success. We\'re here when you need us, not just at launch.',
  },
  {
    icon: <BarChart3 />,
    title: 'Results-Driven',
    description: 'Every pixel and line of code is designed to help you achieve your business goals.',
  },
  {
    icon: <Clock />,
    title: 'Transparent Process',
    description: 'Clear communication and regular updates keep you in the loop throughout the project.',
  },
  {
    icon: <Heart />,
    title: 'Partner Mindset',
    description: 'We invest in your success. Your wins are our wins, and we\'re here for the long haul.',
  },
]

const testimonials = [
  {
    role: 'Business Owner',
    rating: 5,
    text: 'Horizon transformed our online presence completely. The new website has doubled our leads in just three months.',
  },
  {
    role: 'Marketing Director',
    rating: 5,
    text: 'Professional, responsive, and incredibly talented. They delivered exactly what we envisioned and more.',
  },
  {
    role: 'Startup Founder',
    rating: 5,
    text: 'The team\'s attention to detail and commitment to quality is unmatched. Highly recommend their services.',
  },
]

export default function Home() {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 flex items-center justify-center overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary">✨</span>
            Horizon Web Services
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-gray-900">Web Design & Digital Marketing for </span>
            <span className="gradient-text block md:inline">Personal Brands & Businesses</span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Get a modern website that grows your business. We handle design, development, and marketing so you can focus on what matters.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <NeonButton onClick={() => (window.location.href = '/contact')}>
              Get a Free Quote
            </NeonButton>
            <NeonButton
              variant="outline"
              onClick={() => (window.location.href = '/services')}
            >
              View Services
            </NeonButton>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What We Do"
            subtitle="From concept to launch, we deliver digital solutions that make an impact."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                description={service.description}
                icon={service.icon}
                tiers={service.tiers}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <NeonButton onClick={() => (window.location.href = '/services')} variant="outline">
              View All Services & Pricing →
            </NeonButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Choose Horizon"
            subtitle="We're not just another agency. We're your digital growth partners."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, idx) => (
              <GlassCard key={idx}>
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews Carousel */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What Clients Say"
            subtitle="Don't just take our word for it — hear from those who've worked with us"
          />
          
          {/* Reviews Carousel with Google Reviews Integration */}
          <ReviewsCarouselWithGoogle
            placeId={import.meta.env.VITE_GOOGLE_PLACE_ID}
            apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
            fallbackReviews={testimonials.map((t) => ({
              author_name: `Client - ${t.role}`,
              rating: t.rating,
              text: t.text,
              relative_time_description: 'Recent',
            }))}
            autoScrollInterval={5000}
            maxReviews={10}
          />
          
          <p className="text-center text-gray-500 text-sm mt-8">
            * Reviews represent the experiences of our valued clients
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-lg mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Let's discuss how we can help transform your digital presence and grow your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <NeonButton
              onClick={() => (window.location.href = '/contact')}
              className="bg-white text-primary hover:bg-gray-100"
            >
              Request a Free Quote
            </NeonButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
