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
    <GlassCard className={cn('h-full flex flex-col', className)}>
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl text-primary">{icon}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          {monthlySupport && (
            <span className="inline-block px-3 py-1 bg-cyan-50 border border-cyan-200/50 rounded-full text-sm font-medium text-gray-800">
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
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold">View Pricing</span>
            <ChevronDown
              className={cn('transition-transform', expanded && 'rotate-180')}
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
                <div className="space-y-4">
                  {tiers.map((tier, idx) => (
                    <motion.div
                      key={idx}
                      className={cn(
                        'p-4 rounded-lg border-2',
                        tier.popular
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 bg-white'
                      )}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {tier.popular && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-white rounded-full mb-2">
                          Most Popular
                        </span>
                      )}
                      <div className="flex items-baseline justify-between mb-3">
                        <h5 className="font-bold text-lg">{tier.name}</h5>
                        <span className="text-2xl font-bold gradient-text">
                          {tier.price === 'custom' ? 'Custom' : formatCurrency(tier.price)}
                        </span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <Check className="text-primary mt-1 flex-shrink-0" size={16} />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <NeonButton
                        className="w-full text-sm py-2"
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
