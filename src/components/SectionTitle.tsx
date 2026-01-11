import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string | ReactNode
  subtitle?: string
  className?: string
  align?: 'left' | 'center' | 'right'
}

export default function SectionTitle({ title, subtitle, className, align = 'center' }: SectionTitleProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <motion.div
      className={cn('mb-8 md:mb-10', alignClasses[align], className)}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3">
        {typeof title === 'string' ? (
          <span className="gradient-text">{title}</span>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <motion.p
          className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="h-0.5 w-20 bg-gradient-primary rounded-full mt-3 mx-auto"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      />
    </motion.div>
  )
}
