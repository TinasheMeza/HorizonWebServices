/**
 * Case Study Modal Component
 * 
 * Displays detailed project information in a modal format.
 * Features:
 * - Smooth open/close animations
 * - Keyboard navigation (ESC to close)
 * - Responsive design
 * - SEO-friendly content structure
 * - Accessible (ARIA compliant)
 */

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, CheckCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Project } from './ProjectCarousel'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export default function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  // Keyboard navigation: ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto pointer-events-auto relative my-4 sm:my-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Close modal"
                type="button"
              >
                <X size={20} className="sm:w-6 sm:h-6 text-gray-500" />
              </button>

              {/* Project Image */}
              <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                <img
                  src={project.image}
                  alt={`${project.title} - ${project.industry || project.category} ${project.businessType || 'project'} case study`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <span className="inline-block px-2.5 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-primary rounded-full text-xs sm:text-sm font-semibold mb-2">
                    {project.category}
                  </span>
                  <h2 id="modal-title" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Project Overview */}
                <section className="mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Project Overview</h3>
                  <p id="modal-description" className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {project.description}
                  </p>
                </section>

                {/* Industry & Business Type */}
                {(project.industry || project.businessType) && (
                  <section className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">Industry & Business Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.industry && (
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-sm sm:text-base font-medium">
                          {project.industry}
                        </span>
                      )}
                      {project.businessType && (
                        <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary/10 text-secondary rounded-full text-sm sm:text-base font-medium">
                          {project.businessType}
                        </span>
                      )}
                    </div>
                  </section>
                )}

                {/* Business Goals */}
                {project.businessGoals && project.businessGoals.length > 0 && (
                  <section className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Business Goals</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.businessGoals.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="text-primary mt-0.5 sm:mt-1 flex-shrink-0" size={18} />
                          <span className="text-gray-600 text-sm sm:text-base">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Key Outcomes */}
                {project.keyOutcomes && project.keyOutcomes.length > 0 && (
                  <section className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900">Key Outcomes & Value Delivered</h3>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.keyOutcomes.map((outcome, idx) => (
                        <div key={idx} className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 text-sm sm:text-base">{outcome}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 text-center text-sm sm:text-base"
                    >
                      View Live Project
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    type="button"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
