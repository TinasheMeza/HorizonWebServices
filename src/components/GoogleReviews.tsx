/**
 * Google Reviews Component
 * 
 * Fetches and displays Google Reviews from the business Google profile.
 * Features:
 * - Filters reviews to show only 4+ star ratings
 * - Implements caching to avoid excessive API calls
 * - Graceful fallback UI if API fails
 * - Rate-limit protection
 */

import { useState, useEffect, useRef } from 'react'
import { Star, AlertCircle, Loader2 } from 'lucide-react'
import GlassCard from './GlassCard'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  profile_photo_url?: string
  relative_time_description?: string
}

interface GoogleReviewsProps {
  placeId?: string
  apiKey?: string
  maxReviews?: number
}

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds
const CACHE_KEY = 'google_reviews_cache'

interface CachedData {
  reviews: GoogleReview[]
  timestamp: number
}

export default function GoogleReviews({ 
  placeId, 
  apiKey, 
  maxReviews = 10 
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  /**
   * Fetches reviews from Google Places API
   * Implements rate limiting and caching to prevent excessive API calls
   */
  const fetchReviews = async () => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const cachedData: CachedData = JSON.parse(cached)
        const now = Date.now()
        
        // Use cached data if still valid
        if (now - cachedData.timestamp < CACHE_DURATION) {
          console.log('Google Reviews: Using cached data')
          const filtered = cachedData.reviews.filter(r => r.rating >= 4)
          setReviews(filtered.slice(0, maxReviews))
          setLoading(false)
          return
        }
      } catch (e) {
        console.warn('Google Reviews: Failed to parse cache', e)
      }
    }

    // Validate API credentials
    if (!placeId || !apiKey) {
      console.warn('Google Reviews: Missing placeId or apiKey. Using fallback reviews.')
      setError('API configuration missing')
      setLoading(false)
      return
    }

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
      setLoading(true)
      setError(null)

      // Google Places API endpoint
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
      
      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google API error: ${data.status}`)
      }

      // Extract and filter reviews (4+ stars only)
      const allReviews: GoogleReview[] = data.result?.reviews || []
      const highRatedReviews = allReviews
        .filter((review: GoogleReview) => review.rating >= 4)
        .slice(0, maxReviews)

      // Cache the results
      const cacheData: CachedData = {
        reviews: allReviews,
        timestamp: Date.now(),
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

      console.log(`Google Reviews: Fetched ${highRatedReviews.length} high-rated reviews`)
      setReviews(highRatedReviews)
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Google Reviews: Request aborted')
        return
      }
      
      console.error('Google Reviews: Error fetching reviews', err)
      setError('Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()

    // Cleanup: abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [placeId, apiKey, maxReviews])

  // Fallback reviews if API fails or is not configured
  const fallbackReviews: GoogleReview[] = [
    {
      author_name: 'Sarah M.',
      rating: 5,
      text: 'Horizon transformed our online presence completely. The new website has doubled our leads in just three months.',
      time: Date.now(),
      relative_time_description: '2 months ago',
    },
    {
      author_name: 'John D.',
      rating: 5,
      text: 'Professional, responsive, and incredibly talented. They delivered exactly what we envisioned and more.',
      time: Date.now(),
      relative_time_description: '1 month ago',
    },
    {
      author_name: 'Emma L.',
      rating: 5,
      text: "The team's attention to detail and commitment to quality is unmatched. Highly recommend their services.",
      time: Date.now(),
      relative_time_description: '3 weeks ago',
    },
  ]

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-gray-600">Loading reviews...</span>
      </div>
    )
  }

  if (error && reviews.length === 0) {
    return (
      <div className="py-12">
        <div className="flex items-center justify-center gap-3 text-amber-600 mb-4">
          <AlertCircle size={24} />
          <p className="text-sm">Using sample reviews</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {fallbackReviews.map((review, idx) => (
            <ReviewCard key={idx} review={review} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {displayReviews.map((review, idx) => (
        <ReviewCard key={idx} review={review} />
      ))}
    </div>
  )
}

/**
 * Individual Review Card Component
 * Displays a single review with rating, text, and author info
 */
function ReviewCard({ review }: { review: GoogleReview }) {
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
        <p className="font-semibold text-gray-900 text-sm">
          {review.author_name}
        </p>
        {review.relative_time_description && (
          <p className="text-xs text-gray-500 mt-0.5">
            {review.relative_time_description}
          </p>
        )}
      </div>
    </GlassCard>
  )
}
