import { motion } from 'framer-motion'
import { Code, Globe, TrendingUp, Star, Quote, Zap, Shield, Users, BarChart3, Clock, Heart, Share2, Image, Settings } from 'lucide-react'
import SectionTitle from '@/components/SectionTitle'
import GlassCard from '@/components/GlassCard'
import NeonButton from '@/components/NeonButton'
import ServiceCard from '@/components/ServiceCard'
import { PricingTier } from '@/components/ServiceCard'

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Floating Images/Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/3 w-36 h-36 bg-accent/20 rounded-full blur-3xl"
            animate={{
              y: [0, -25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-white">Transform Your </span>
            <span className="gradient-text">Digital Presence</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Professional web design and digital marketing services to help your business thrive online.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <NeonButton onClick={() => (window.location.href = '/contact')}>
              Get Started Today
            </NeonButton>
            <NeonButton
              variant="outline"
              onClick={() => (window.location.href = '/portfolio')}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              View Our Work
            </NeonButton>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What We Do"
            subtitle="From concept to launch, we deliver digital solutions that make an impact."
          />
          <div className="grid md:grid-cols-3 gap-8">
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
          <div className="text-center mt-12">
            <NeonButton onClick={() => (window.location.href = '/services')} variant="outline">
              View All Services & Pricing →
            </NeonButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
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

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What Clients Say"
            subtitle="Don't just take our word for it — hear from those who've worked with us"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <GlassCard key={idx} className="relative">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-yellow-400 text-yellow-400" size={20} />
                  ))}
                </div>
                <Quote className="text-primary mb-4 absolute top-6 right-6 opacity-50" size={48} />
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-gray-900">Client Testimonial</p>
                  <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            * Testimonials represent the experiences of our valued clients
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 text-white/90"
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
