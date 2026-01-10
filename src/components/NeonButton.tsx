import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NeonButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function NeonButton({
  children,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  disabled = false,
}: NeonButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden'
  
  const variants = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/50',
    secondary: 'bg-gradient-cyan-purple text-white hover:shadow-lg hover:shadow-primary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], disabled && 'opacity-50 cursor-not-allowed', className)}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
