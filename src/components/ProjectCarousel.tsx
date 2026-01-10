import { useState } from 'react'
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
  tags: string[]
}

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  const currentProject = projects[currentIndex]

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
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

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevProject}
          className="p-2 rounded-full bg-white/70 backdrop-blur-md border border-white/20 hover:bg-white transition-colors"
          aria-label="Previous project"
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
        >
          <ChevronRight size={24} className="text-primary" />
        </button>
      </div>
    </div>
  )
}
