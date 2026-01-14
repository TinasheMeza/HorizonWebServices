/**
 * Reviews Carousel with Google Reviews Integration
 * 
 * Combines Google Reviews API fetching with the ReviewsCarousel component.
 * Falls back to provided reviews if Google Reviews are unavailable.
 */

import { useState, useEffect, useRef } from 'react'
import ReviewsCarousel from './ReviewsCarousel'
import { Loader2, AlertCircle } from 'lucide-react'

interface Review {
  author_name: string
  rating: number
  text: string
  time?: number
  profile_photo_url?: string
  relative_time_description?: string
}

interface ReviewsCarouselWithGoogleProps {
  placeId?: string
  apiKey?: string
  fallbackReviews: Review[]
  autoScrollInterval?: number
  maxReviews?: number
}

// Cache configuration
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour
const CACHE_KEY = 'google_reviews_cache'

interface CachedData {
  reviews: Review[]
  timestamp: number
}

export default function ReviewsCarouselWithGoogle({
  placeId,
  apiKey,
  fallbackReviews,
  autoScrollInterval = 5000,
  maxReviews = 10,
}: ReviewsCarouselWithGoogleProps) {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews)
  const [loading, setLoading] = useState(!!(placeId && apiKey))
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // If no API credentials, use fallback immediately
    if (!placeId || !apiKey) {
      console.log('Google Reviews: Using fallback reviews (no API credentials)')
      setReviews(fallbackReviews)
      setLoading(false)
      return
    }

    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const cachedData: CachedData = JSON.parse(cached)
        const now = Date.now()

        if (now - cachedData.timestamp < CACHE_DURATION) {
          console.log('Google Reviews: Using cached data')
          const filtered = cachedData.reviews.filter((r) => r.rating >= 4)
          setReviews(filtered.length > 0 ? filtered.slice(0, maxReviews) : fallbackReviews)
          setLoading(false)
          return
        }
      } catch (e) {
        console.warn('Google Reviews: Failed to parse cache', e)
      }
    }

    // Fetch from API
    const fetchReviews = async () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      abortControllerRef.current = new AbortController()

      try {
        setLoading(true)
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

        const allReviews: Review[] = data.result?.reviews || []
        const highRatedReviews = allReviews
          .filter((review: Review) => review.rating >= 4)
          .slice(0, maxReviews)

        // Cache the results
        const cacheData: CachedData = {
          reviews: allReviews,
          timestamp: Date.now(),
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))

        console.log(`Google Reviews: Fetched ${highRatedReviews.length} high-rated reviews`)
        setReviews(highRatedReviews.length > 0 ? highRatedReviews : fallbackReviews)
      } catch (err: any) {
        if (err.name === 'AbortError') {
          return
        }
        console.error('Google Reviews: Error fetching reviews', err)
        setReviews(fallbackReviews)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [placeId, apiKey, maxReviews, fallbackReviews])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin text-primary" size={32} />
        <span className="ml-3 text-gray-600">Loading reviews...</span>
      </div>
    )
  }

  return <ReviewsCarousel reviews={reviews} autoScrollInterval={autoScrollInterval} />
}
