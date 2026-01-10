import SectionTitle from '@/components/SectionTitle'
import ProjectCarousel from '@/components/ProjectCarousel'
import { Project } from '@/components/ProjectCarousel'

const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    category: 'Web Application',
    description: 'A fully-featured e-commerce platform with custom payment integration, inventory management, and admin dashboard. Built with modern technologies for optimal performance and scalability.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
  },
  {
    id: '2',
    title: 'Corporate Website Redesign',
    category: 'Website',
    description: 'Complete redesign of a corporate website with modern UI/UX, improved navigation, and enhanced mobile experience. Resulted in 250% increase in user engagement.',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: '3',
    title: 'Restaurant Booking System',
    category: 'Web Application',
    description: 'Custom booking system for a restaurant chain with real-time availability, table management, and customer notifications. Integrated with POS system for seamless operations.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    tags: ['Vue.js', 'Firebase', 'Real-time'],
  },
  {
    id: '4',
    title: 'Digital Marketing Agency Site',
    category: 'Website',
    description: 'Modern, conversion-optimized website for a digital marketing agency. Features portfolio showcase, service pages, and integrated contact forms with lead tracking.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    tags: ['Next.js', 'TypeScript', 'CMS'],
  },
  {
    id: '5',
    title: 'Healthcare Management Portal',
    category: 'Web Application',
    description: 'Secure patient management portal with appointment scheduling, medical records access, and telemedicine integration. HIPAA compliant with advanced security features.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Security'],
  },
  {
    id: '6',
    title: 'Real Estate Listings Platform',
    category: 'Web Application',
    description: 'Comprehensive real estate platform with property listings, advanced search filters, virtual tours, and agent management system. Mobile-first design for on-the-go browsing.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    liveUrl: 'https://example.com',
    tags: ['React', 'Map Integration', 'Image Processing'],
  },
]

export default function Portfolio() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Our Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our recent work and see how we've helped businesses transform their digital presence.
          </p>
        </div>
      </section>

      {/* Projects Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Projects"
            subtitle="A selection of our recent work across various industries"
          />
          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Let's discuss how we can bring your vision to life with a custom solution tailored to your needs.
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
