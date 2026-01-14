/**
 * Project Carousel Component
 * 
 * Displays portfolio projects in a carousel with:
 * - Smooth transitions between projects
 * - Mobile swipe gestures (touch-friendly)
 * - Desktop navigation buttons
 * - Dot indicators for navigation
 * - Accessibility features
 */

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import GlassCard from './GlassCard'
import { cn } from '@/lib/utils'

export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  liveUrl?: string
  tags?: string[]
  // New fields for enhanced portfolio
  industry?: string
  businessType?: string
  businessGoals?: string[]
  keyOutcomes?: string[]
}

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in pixels) for mobile
  const minSwipeDistance = 50

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  /**
   * Touch event handlers for mobile swipe gestures
   * Enables smooth, touch-friendly navigation on mobile devices
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextProject()
    } else if (isRightSwipe) {
      prevProject()
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="relative" ref={containerRef}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="touch-pan-y"
        >
          <GlassCard className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-primary">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3 w-fit">
                  {currentProject.category}
                </span>
                <h3 className="text-3xl font-bold mb-4">{currentProject.title}</h3>
                <p className="text-gray-600 mb-6">{currentProject.description}</p>
                {currentProject.tags && currentProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    View Live Site <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Navigation - Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevProject}
          className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-white/20 hover:bg-white transition-colors"
          aria-label="Previous project"
          type="button"
        >
          <ChevronLeft size={24} className="text-primary" />
        </button>

        <div className="flex gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToProject(idx)}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                idx === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextProject}
          className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-white/20 hover:bg-white transition-colors"
          aria-label="Next project"
          type="button"
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      </div>

      {/* Mobile swipe hint (optional, can be removed if not needed) */}
      <div className="md:hidden text-center mt-4">
        <p className="text-xs text-gray-500">Swipe left or right to navigate</p>
      </div>
    </div>
  )
}
