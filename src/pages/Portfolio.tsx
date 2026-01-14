/**
 * Portfolio Page Component
 * 
 * Displays portfolio projects in a responsive grid layout.
 * Features:
 * - SEO-optimized content structure
 * - Case study modals for detailed project information
 * - Live projects with direct links
 * - Coming soon projects with appropriate UI states
 * - Micro-animations and hover effects
 */

import { useState } from 'react'
import SectionTitle from '@/components/SectionTitle'
import PortfolioCard from '@/components/PortfolioCard'
import CaseStudyModal from '@/components/CaseStudyModal'
import { Project } from '@/components/ProjectCarousel'

// Live Projects
const liveProjects: Project[] = [
  {
    id: '1',
    title: 'Load Movers Ltd',
    category: 'Website',
    industry: 'Logistics & Transportation',
    businessType: 'Moving Company',
    description: 'A conversion-driven website built for a professional logistics and moving company, designed to establish trust, clearly communicate services, and generate qualified customer enquiries through a clean and intuitive layout.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    liveUrl: 'https://loadmoversltd.co.za',
    businessGoals: [
      'Establish online presence and credibility',
      'Generate qualified customer enquiries',
      'Showcase services and expertise',
      'Build trust with potential clients'
    ],
    keyOutcomes: [
      'Professional brand representation',
      'Clear service communication',
      'User-friendly enquiry system',
      'Mobile-responsive design'
    ],
  },
  {
    id: '2',
    title: 'Eden Scents',
    category: 'E-commerce',
    industry: 'E-commerce',
    businessType: 'Candles & Fragrance Brand',
    description: 'An elegant e-commerce experience crafted for a luxury candle and fragrance brand, combining refined visual storytelling with seamless product browsing to drive online sales and elevate brand perception.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
    liveUrl: 'https://eden-scents.vercel.app/',
    businessGoals: [
      'Drive online sales and revenue',
      'Elevate brand perception',
      'Showcase product range effectively',
      'Provide seamless shopping experience'
    ],
    keyOutcomes: [
      'Elegant visual presentation',
      'Streamlined checkout process',
      'Enhanced brand storytelling',
      'Mobile-optimized shopping experience'
    ],
  },
  {
    id: '3',
    title: 'Legal Aid Services',
    category: 'Website',
    industry: 'Legal Services',
    businessType: 'Law Firm',
    description: 'A professional legal services website designed to inspire confidence, clearly outline practice areas, and guide potential clients toward consultations with clarity and authority.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
    liveUrl: 'https://legal-aid-ten.vercel.app/',
    businessGoals: [
      'Build client trust and confidence',
      'Clearly communicate practice areas',
      'Generate consultation requests',
      'Establish professional authority'
    ],
    keyOutcomes: [
      'Professional and trustworthy design',
      'Clear practice area presentation',
      'Easy consultation booking',
      'Accessible and compliant structure'
    ],
  },
]

// Upcoming Projects
const upcomingProjects: Project[] = [
  {
    id: '4',
    title: 'Corporate Website Redesign',
    category: 'Website',
    industry: 'Corporate',
    businessType: 'Business Services',
    description: 'Complete redesign of a corporate website with modern UI/UX, improved navigation, and enhanced mobile experience. Resulted in 250% increase in user engagement.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    // No liveUrl - coming soon
  },
  {
    id: '5',
    title: 'Restaurant Booking System',
    category: 'Web Application',
    industry: 'Hospitality',
    businessType: 'Restaurant Chain',
    description: 'Custom booking system for a restaurant chain with real-time availability, table management, and customer notifications. Integrated with POS system for seamless operations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    // No liveUrl - coming soon
  },
  {
    id: '6',
    title: 'Digital Marketing Agency Site',
    category: 'Website',
    industry: 'Marketing',
    businessType: 'Digital Agency',
    description: 'Modern, conversion-optimized website for a digital marketing agency. Features portfolio showcase, service pages, and integrated contact forms with lead tracking.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    // No liveUrl - coming soon
  },
  {
    id: '7',
    title: 'Healthcare Management Portal',
    category: 'Web Application',
    industry: 'Healthcare',
    businessType: 'Medical Services',
    description: 'Secure patient management portal with appointment scheduling, medical records access, and telemedicine integration. HIPAA compliant with advanced security features.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    // No liveUrl - coming soon
  },
  {
    id: '8',
    title: 'Real Estate Listings Platform',
    category: 'Web Application',
    industry: 'Real Estate',
    businessType: 'Property Listings',
    description: 'Comprehensive real estate platform with property listings, advanced search filters, virtual tours, and agent management system. Mobile-first design for on-the-go browsing.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    // No liveUrl - coming soon
  },
]

// Combine all projects
const allProjects = [...liveProjects, ...upcomingProjects]

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Small delay before clearing project to allow exit animation
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="pt-0">
      {/* SEO-Optimized Portfolio Section */}
      <section className="py-12 md:py-16" aria-label="Portfolio projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO-Optimized Heading */}
          <SectionTitle
            title="Our Portfolio"
            subtitle="Professional Web Design Services & Business Website Development Across Multiple Industries"
          />

          {/* SEO Meta Description (hidden, for SEO) */}
          <div className="sr-only">
            <h2>Professional Web Design Services</h2>
            <p>
              Explore our portfolio of custom websites, e-commerce platforms, and web applications. 
              We specialize in business website development, e-commerce website design, law firm website design, 
              and custom websites for small businesses across South Africa.
            </p>
          </div>

          {/* Live Projects Section */}
          <section className="mb-12" aria-label="Live portfolio projects">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Live Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {liveProjects.map((project, index) => (
                <div key={project.id} role="listitem">
                  <PortfolioCard
                    project={project}
                    onCardClick={handleCardClick}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Upcoming Projects Section */}
          <section aria-label="Upcoming portfolio projects">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Upcoming Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
              {upcomingProjects.map((project, index) => (
                <div key={project.id} role="listitem">
                  <PortfolioCard
                    project={project}
                    onCardClick={handleCardClick}
                    index={index + liveProjects.length}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* SEO-Optimized Content (hidden, for search engines) */}
          <div className="sr-only">
            <h3>E-commerce Website Design</h3>
            <p>
              Our e-commerce solutions combine elegant design with seamless functionality to drive online sales 
              and enhance brand perception.
            </p>
            <h3>Law Firm Website Design</h3>
            <p>
              Professional legal services websites designed to inspire confidence and guide potential clients 
              toward consultations with clarity and authority.
            </p>
            <h3>Custom Websites for Small Businesses</h3>
            <p>
              Tailored web solutions for small businesses, designed to establish online presence, build trust, 
              and generate qualified customer enquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Let's discuss how we can bring your vision to life with a custom solution tailored to your needs. 
            Our professional web design services are designed to help your business grow.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
