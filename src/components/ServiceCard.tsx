import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'
import GlassCard from './GlassCard'
import NeonButton from './NeonButton'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

export interface PricingTier {
  name: string
  price: number | 'custom'
  features: string[]
  popular?: boolean
}

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  tiers?: PricingTier[]
  customPricing?: boolean
  customFeatures?: string[]
  monthlySupport?: number
  className?: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  tiers,
  customPricing = false,
  customFeatures,
  monthlySupport,
  className,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <GlassCard className={cn('h-full flex flex-col transition-all duration-300 hover:border-primary hover:border-2', className)}>
      <div className="flex items-start gap-3 mb-3">
        <div className="text-3xl text-primary flex-shrink-0">{icon}</div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-1.5">{title}</h3>
          <p className="text-gray-600 text-sm mb-2.5 leading-relaxed">{description}</p>
          {monthlySupport && (
            <span className="inline-block px-2.5 py-1 bg-cyan-50 border border-cyan-200/50 rounded-full text-xs font-medium text-gray-800">
              Monthly Support: {formatCurrency(monthlySupport)}/month
            </span>
          )}
        </div>
      </div>

      {customPricing ? (
        <div className="mt-auto">
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3">Features Include:</h4>
            <ul className="space-y-2">
              {customFeatures?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <NeonButton
            className="w-full"
            onClick={() => window.location.href = '/contact?service=' + encodeURIComponent(title)}
          >
            Request Quote
          </NeonButton>
        </div>
      ) : tiers && tiers.length > 0 ? (
        <div className="mt-auto">
          <motion.button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between p-3.5 rounded-lg bg-primary/5 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-expanded={expanded}
            aria-label={expanded ? 'Hide pricing' : 'Show pricing'}
          >
            <span className="font-semibold text-gray-900">View Pricing</span>
            <ChevronDown
              className={cn('transition-transform text-primary', expanded && 'rotate-180')}
            />
          </motion.button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tiers.map((tier, idx) => (
                    <motion.div
                      key={idx}
                      className={cn(
                        'p-3.5 rounded-lg border-2',
                        tier.popular
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 bg-white'
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {tier.popular && (
                        <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-primary text-white rounded-full mb-2">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-baseline justify-between mb-2.5">
                        <h5 className="font-bold text-base">{tier.name}</h5>
                        <span className="text-xl font-bold gradient-text">
                          {tier.price === 'custom' ? 'Custom' : formatCurrency(tier.price)}
                        </span>
                      </div>
                      <ul className="space-y-1.5 mb-3">
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="text-primary mt-0.5 flex-shrink-0" size={14} />
                            <span className="text-xs text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <NeonButton
                        className="w-full text-xs py-1.5"
                        onClick={() => window.location.href = '/contact?service=' + encodeURIComponent(title + ' - ' + tier.name)}
                      >
                        Get Started
                      </NeonButton>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : null}
    </GlassCard>
  )
}
