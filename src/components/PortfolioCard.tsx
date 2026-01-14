/**
 * Portfolio Card Component
 * 
 * Displays individual portfolio project cards with:
 * - Micro-animations on hover (elevation, shadow, image zoom)
 * - Responsive design
 * - Case study modal integration
 * - "Coming Soon" state for upcoming projects
 * - SEO-optimized structure
 */

import { motion } from 'framer-motion'
import { ExternalLink, Clock } from 'lucide-react'
import GlassCard from './GlassCard'
import { Project } from './ProjectCarousel'

interface PortfolioCardProps {
  project: Project
  onCardClick: (project: Project) => void
  index: number
}

export default function PortfolioCard({ project, onCardClick, index }: PortfolioCardProps) {
  const isComingSoon = !project.liveUrl

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="h-full"
      >
        <GlassCard
          className="h-full flex flex-col overflow-hidden cursor-pointer group border border-gray-200 hover:border-primary/50 transition-all duration-300"
          onClick={() => onCardClick(project)}
        >
          {/* Image Container with Zoom Effect */}
          <div className="relative aspect-video overflow-hidden bg-gradient-primary rounded-t-lg">
            <motion.img
              src={project.image}
              alt={`${project.title} - ${project.industry || project.category} ${project.businessType || 'project'} website design and development by Horizon Web Services`}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              loading="lazy"
            />
            
            {/* Coming Soon Badge */}
            {isComingSoon && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full flex items-center gap-2">
                <Clock size={14} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Coming Soon</span>
              </div>
            )}

            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex flex-col flex-grow">
            {/* Category Badge */}
            <div className="mb-2 sm:mb-3">
              <span className="inline-block px-2.5 sm:px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {/* Industry & Business Type */}
            {(project.industry || project.businessType) && (
              <div className="mb-4 flex flex-wrap gap-2 items-center">
                {project.industry && (
                  <>
                    <span className="text-sm text-gray-600 font-medium">
                      {project.industry}
                    </span>
                    {project.businessType && <span className="text-gray-400">•</span>}
                  </>
                )}
                {project.businessType && (
                  <span className="text-sm text-gray-600">
                    {project.businessType}
                  </span>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 mb-4 sm:mb-6 flex-grow leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base ${
                isComingSoon
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-primary/50'
              }`}
              disabled={isComingSoon}
              onClick={(e) => {
                e.stopPropagation()
                if (!isComingSoon) {
                  onCardClick(project)
                }
              }}
              type="button"
            >
              {isComingSoon ? (
                <>
                  <Clock size={18} />
                  Coming Soon
                </>
              ) : (
                <>
                  View Live Project
                  <ExternalLink size={18} />
                </>
              )}
            </motion.button>
          </div>
        </GlassCard>
      </motion.div>
    </motion.article>
  )
}
