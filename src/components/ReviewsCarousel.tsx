/**
 * Reviews Carousel Component
 * 
 * Displays reviews in a carousel with:
 * - Continuous auto-scroll (smooth, infinite loop)
 * - Pause on hover (desktop)
 * - Swipe gestures enabled on mobile
 * - Touch-friendly momentum scrolling
 * - Accessibility features (ARIA roles, keyboard navigation)
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import GlassCard from './GlassCard'

interface Review {
  author_name: string
  rating: number
  text: string
  time?: number
  profile_photo_url?: string
  relative_time_description?: string
}

interface ReviewsCarouselProps {
  reviews: Review[]
  autoScrollInterval?: number // milliseconds
}

export default function ReviewsCarousel({
  reviews,
  autoScrollInterval = 5000, // 5 seconds default
}: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  /**
   * Auto-scroll functionality
   * Pauses on hover and resumes when mouse leaves
   */
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (isPaused || reviews.length <= 1) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, autoScrollInterval)
  }, [isPaused, reviews.length, autoScrollInterval])

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [startAutoScroll])

  /**
   * Navigation handlers
   */
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
    // Reset auto-scroll timer
    startAutoScroll()
  }, [reviews.length, startAutoScroll])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    // Reset auto-scroll timer
    startAutoScroll()
  }, [reviews.length, startAutoScroll])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    startAutoScroll()
  }

  /**
   * Touch event handlers for mobile swipe
   */
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsPaused(true) // Pause auto-scroll during swipe
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsPaused(false)
      return
    }

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }

    // Resume auto-scroll after swipe
    setIsPaused(false)
    setTouchStart(null)
    setTouchEnd(null)
  }

  /**
   * Keyboard navigation for accessibility
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  if (reviews.length === 0) {
    return null
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      ref={containerRef}
    >
      {/* Carousel Container */}
      <div
        className="overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-label="Reviews carousel"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Display current review and adjacent ones for better UX */}
              {[currentIndex, (currentIndex + 1) % reviews.length, (currentIndex + 2) % reviews.length].map(
                (idx, displayIdx) => {
                  const review = reviews[idx]
                  if (!review) return null

                  return (
                    <div
                      key={`${idx}-${displayIdx}`}
                      className={displayIdx === 0 ? 'md:col-span-1' : 'hidden md:block'}
                    >
                      <ReviewCard review={review} />
                    </div>
                  )
                }
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {reviews.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white transition-colors shadow-lg z-10"
            aria-label="Previous review"
            type="button"
          >
            <ChevronLeft size={24} className="text-primary" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white transition-colors shadow-lg z-10"
            aria-label="Next review"
            type="button"
          >
            <ChevronRight size={24} className="text-primary" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {reviews.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Review indicators">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all rounded-full ${
                idx === currentIndex
                  ? 'bg-primary w-8 h-3'
                  : 'bg-gray-300 w-3 h-3 hover:bg-gray-400'
              }`}
              aria-label={`Go to review ${idx + 1}`}
              aria-selected={idx === currentIndex}
              role="tab"
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * Individual Review Card Component
 */
function ReviewCard({ review }: { review: Review }) {
  return (
    <GlassCard className="relative border border-gray-200 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${
              i < review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300'
            }`}
            size={16}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-5 text-sm leading-relaxed flex-grow">
        "{review.text}"
      </p>
      <div className="pt-4 border-t border-gray-100">
        <p className="font-semibold text-gray-900 text-sm">{review.author_name}</p>
        {review.relative_time_description && (
          <p className="text-xs text-gray-500 mt-0.5">{review.relative_time_description}</p>
        )}
      </div>
    </GlassCard>
  )
}
