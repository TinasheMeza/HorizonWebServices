import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  dark?: boolean
  hover?: boolean
}

export default function GlassCard({ children, className, dark = false, hover = true }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6',
        dark ? 'glass-dark' : 'glass',
        hover && 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
