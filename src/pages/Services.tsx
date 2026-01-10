import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Globe, Code, TrendingUp, Share2, Image, Settings } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import { PricingTier } from '@/components/ServiceCard'
import NeonButton from '@/components/NeonButton'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  tiers?: PricingTier[]
  customPricing?: boolean
  customFeatures?: string[]
  monthlySupport?: number
}

const services: Service[] = [
  {
    id: 'websites',
    title: 'Custom Websites',
    description: 'Beautiful, responsive websites that capture your brand and convert visitors into customers.',
    icon: <Globe />,
    monthlySupport: 350,
    tiers: [
      {
        name: 'Starter',
        price: 4999,
        features: [
          'Up to 5 pages',
          'Mobile responsive design',
          'Contact form integration',
          'Basic SEO setup',
          '2 revision rounds',
        ],
      },
      {
        name: 'Professional',
        price: 9999,
        features: [
          'Up to 10 pages',
          'Custom animations',
          'Blog/News section',
          'Advanced SEO optimization',
          'Unlimited revision rounds',
        ],
        popular: true,
      },
    ] as PricingTier[],
  },
  {
    id: 'web-apps',
    title: 'Custom Web Applications',
    description: 'Custom web applications built to streamline your business processes. Tailored solutions for your unique requirements.',
    icon: <Code />,
    customPricing: true,
    customFeatures: [
      'Custom database design',
      'User authentication & authorization',
      'API integration',
      'Real-time features',
      'Admin dashboard',
      'Mobile-responsive interface',
      'Scalable architecture',
      'Ongoing maintenance & support',
    ],
  },
  {
    id: 'google-ads',
    title: 'Google Ads Management',
    description: 'Maximize your ROI with professional Google Ads management. Targeted campaigns that drive results.',
    icon: <TrendingUp />,
    tiers: [
      {
        name: 'Starter',
        price: 2999,
        features: [
          'Up to R10,000 ad spend/month',
          'Campaign setup & optimization',
          'Monthly performance report',
          'Keyword research',
          'Ad copy creation',
        ],
      },
      {
        name: 'Professional',
        price: 4999,
        features: [
          'Up to R25,000 ad spend/month',
          'Advanced campaign optimization',
          'Bi-weekly performance reports',
          'A/B testing',
          'Landing page optimization',
          'Conversion tracking setup',
        ],
        popular: true,
      },
      {
        name: 'Premium',
        price: 7999,
        features: [
          'Unlimited ad spend',
          'Dedicated account manager',
          'Weekly performance reports',
          'Multi-channel strategy',
          'Advanced analytics & insights',
          'Competitor analysis',
        ],
      },
    ] as PricingTier[],
  },
  {
    id: 'social-media',
    title: 'Social Media Advertising',
    description: 'Reach your target audience on Facebook, Instagram, and LinkedIn with professionally managed ad campaigns.',
    icon: <Share2 />,
    tiers: [
      {
        name: 'Starter',
        price: 2499,
        features: [
          'Up to R8,000 ad spend/month',
          'Campaign setup on 2 platforms',
          'Monthly performance report',
          'Ad creative design',
          'Audience targeting',
        ],
      },
      {
        name: 'Professional',
        price: 4499,
        features: [
          'Up to R20,000 ad spend/month',
          'Campaign setup on 3 platforms',
          'Bi-weekly performance reports',
          'Video ad creation',
          'Retargeting campaigns',
          'A/B testing',
        ],
        popular: true,
      },
      {
        name: 'Premium',
        price: 6999,
        features: [
          'Unlimited ad spend',
          'All major platforms',
          'Weekly performance reports',
          'Influencer partnerships',
          'Content creation',
          'Community management',
        ],
      },
    ] as PricingTier[],
  },
  {
    id: 'design',
    title: 'Poster & Graphic Design',
    description: 'Professional graphic design services for posters, flyers, social media graphics, and branding materials.',
    icon: <Image />,
    tiers: [
      {
        name: 'Starter',
        price: 499,
        features: [
          '1 design concept',
          '2 revision rounds',
          'Social media formats',
          'High-resolution files',
          'Basic branding elements',
        ],
      },
      {
        name: 'Professional',
        price: 999,
        features: [
          '3 design concepts',
          'Unlimited revisions',
          'Multiple formats & sizes',
          'Print-ready files',
          'Brand guidelines',
          'Source files included',
        ],
        popular: true,
      },
      {
        name: 'Premium',
        price: 1999,
        features: [
          '5 design concepts',
          'Unlimited revisions',
          'Complete brand package',
          'Multiple deliverables',
          'Priority support',
          'Extended usage rights',
        ],
      },
    ] as PricingTier[],
  },
  {
    id: 'maintenance',
    title: 'Website Maintenance',
    description: 'Keep your website running smoothly with regular updates, backups, and security monitoring.',
    icon: <Settings />,
    tiers: [
      {
        name: 'Basic',
        price: 999,
        features: [
          'Monthly updates',
          'Security monitoring',
          'Backup & restore',
          'Uptime monitoring',
          'Email support',
        ],
      },
      {
        name: 'Professional',
        price: 1999,
        features: [
          'Weekly updates',
          'Advanced security',
          'Daily backups',
          'Performance optimization',
          'Priority support',
          'Content updates (up to 5 hours/month)',
        ],
        popular: true,
      },
      {
        name: 'Premium',
        price: 3499,
        features: [
          'Daily updates',
          'Enterprise security',
          'Real-time backups',
          '24/7 monitoring',
          'Dedicated support',
          'Unlimited content updates',
          'Monthly performance reports',
        ],
      },
    ] as PricingTier[],
  },
]

export default function Services() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')

  useEffect(() => {
    if (preselectedService) {
      const element = document.getElementById(preselectedService.toLowerCase().replace(/\s+/g, '-'))
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [preselectedService])

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50/50 via-purple-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 mb-6">
            <span className="text-primary">✨</span>
            Transparent Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Our Services & </span>
            <span className="gradient-text">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Clear, upfront pricing for all our services. No hidden fees, no surprises. Choose a package or let's create a custom solution together.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service) => (
              <div key={service.id} id={service.id}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  tiers={service.tiers}
                  customPricing={service.customPricing}
                  customFeatures={service.customFeatures}
                  monthlySupport={service.monthlySupport}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solution CTA */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            We specialize in creating tailored solutions that fit your unique business requirements. Let's discuss your project.
          </p>
          <NeonButton
            onClick={() => (window.location.href = '/contact')}
            className="bg-white text-primary hover:bg-gray-100"
          >
            Request a Custom Quote
          </NeonButton>
        </div>
      </section>
    </div>
  )
}
