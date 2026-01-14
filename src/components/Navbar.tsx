/**
 * Navigation Bar Component
 * 
 * Features:
 * - Responsive design (desktop and mobile)
 * - Smooth animations with Framer Motion
 * - Active route highlighting
 * - Mobile menu with slide animation
 * - Accessible navigation (ARIA labels)
 */

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import NeonButton from './NeonButton'
import { cn } from '@/lib/utils'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Desktop Navigation Menu Bar */}
      <div className="hidden md:flex fixed top-4 z-40" style={{ left: '15px' }}>
        <div className="bg-white/60 backdrop-blur-sm rounded-full px-5 py-2 border border-gray-200/50 flex items-center gap-6 shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-all duration-300 relative',
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-gray-700 hover:text-primary'
              )}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 z-40 p-2 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-md"
        style={{ left: '15px' }}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X size={24} className="text-gray-700" /> : <Menu size={24} className="text-gray-700" />}
      </button>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden fixed top-16 z-40"
        style={{ left: '15px', right: '15px' }}
        initial={false}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {mobileMenuOpen && (
          <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 border border-gray-200 shadow-lg space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-2.5 rounded-lg transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <NeonButton
                onClick={() => {
                  setMobileMenuOpen(false)
                  window.location.href = '/contact'
                }}
                className="w-full"
              >
                Get a Quote
              </NeonButton>
            </div>
          </div>
        )}
      </motion.div>
    </>
  )
}
