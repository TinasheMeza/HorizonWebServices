import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, Clock, Upload, CheckCircle, AlertCircle, Send } from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import NeonButton from '@/components/NeonButton'
import { createQuoteRequest, sendQuoteRequestEmail, QuoteRequest } from '@/lib/base44'

const services = [
  'Custom Websites',
  'Custom Web Applications',
  'Google Ads Management',
  'Social Media Advertising',
  'Poster & Graphic Design',
  'Website Maintenance',
  'Other',
]

const budgetRanges = [
  'Under R5,000',
  'R5,000 - R10,000',
  'R10,000 - R25,000',
  'R25,000 - R50,000',
  'R50,000+',
]

export default function Contact() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || '',
    budgetRange: '',
    projectDescription: '',
    file: null as File | null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select a budget range'
    }

    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Please provide more details (at least 20 characters)'
    }

    if (formData.file && formData.file.size > 10 * 1024 * 1024) {
      newErrors.file = 'File size must be less than 10MB'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File size must be less than 10MB' }))
        return
      }
      setFormData(prev => ({ ...prev, file }))
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.file
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // In a real implementation, you would upload the file first
      // For now, we'll just store the file name
      const fileUrl = formData.file ? formData.file.name : undefined

      const quoteRequest: Omit<QuoteRequest, 'id' | 'status' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        budgetRange: formData.budgetRange,
        projectDescription: formData.projectDescription,
        fileUrl,
      }

      const created = await createQuoteRequest(quoteRequest)
      
      // Send email notification
      await sendQuoteRequestEmail(created as QuoteRequest)

      setSubmitStatus('success')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        budgetRange: '',
        projectDescription: '',
        file: null,
      })

      // Reset file input
      const fileInput = document.getElementById('file') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              {/* Logo and Intro */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold gradient-text mb-4">Horizon WEB SERVICES</h2>
                <p className="text-gray-600">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Email Us</h3>
                    <p className="text-gray-500 text-sm mb-2">Drop us a line anytime</p>
                    <a
                      href="mailto:hello@horizonwebservices.co.za"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      hello@horizonwebservices.co.za
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Call Us</h3>
                    <p className="text-gray-500 text-sm mb-2">Mon-Fri from 9am to 5pm</p>
                    <a
                      href="tel:+27123456789"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      +27 12 345 6789
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">Business Hours</h3>
                    <p className="text-gray-500 text-sm mb-2">When we're available</p>
                    <p className="text-gray-600">
                      Mon-Fri: 9:00 AM - 5:00 PM SAST
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Quick Response Guarantee */}
              <GlassCard className="bg-cyan-50 border-cyan-200/50">
                <h3 className="font-semibold text-gray-900 mb-2">Quick Response Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                </p>
              </GlassCard>
            </div>

            {/* Quote Request Form */}
            <div className="lg:col-span-2">
              <GlassCard>
                <h2 className="text-3xl font-bold mb-6 gradient-text">Request a Quote</h2>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  >
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-green-800">Thank you for your request!</p>
                      <p className="text-green-700 text-sm mt-1">
                        We've received your quote request and will get back to you within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-red-800">Error submitting form</p>
                      <p className="text-red-700 text-sm mt-1">
                        Please try again or contact us directly via email or phone.
                      </p>
                    </div>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, name: e.target.value }))
                          setErrors(prev => {
                            const newErrors = { ...prev }
                            delete newErrors.name
                            return newErrors
                          })
                        }}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, email: e.target.value }))
                          setErrors(prev => {
                            const newErrors = { ...prev }
                            delete newErrors.email
                            return newErrors
                          })
                        }}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.phone
                          return newErrors
                        })
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="+27 12 345 6789"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Service *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, service: e.target.value }))
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.service
                          return newErrors
                        })
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.service ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="budgetRange" className="block text-sm font-medium mb-2">
                      Budget Range *
                    </label>
                    <select
                      id="budgetRange"
                      value={formData.budgetRange}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, budgetRange: e.target.value }))
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.budgetRange
                          return newErrors
                        })
                      }}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.budgetRange ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <p className="text-red-500 text-sm mt-1">{errors.budgetRange}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="projectDescription" className="block text-sm font-medium mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="projectDescription"
                      value={formData.projectDescription}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, projectDescription: e.target.value }))
                        setErrors(prev => {
                          const newErrors = { ...prev }
                          delete newErrors.projectDescription
                          return newErrors
                        })
                      }}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                      placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                    />
                    {errors.projectDescription && (
                      <p className="text-red-500 text-sm mt-1">{errors.projectDescription}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">
                      {formData.projectDescription.length} characters (minimum 20)
                    </p>
                  </div>

                  <div>
                    <label htmlFor="file" className="block text-sm font-medium mb-2">
                      Attach Files (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      />
                      <label
                        htmlFor="file"
                        className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <Upload size={20} className="text-gray-500" />
                        <span className="text-gray-700">
                          {formData.file ? formData.file.name : 'Choose file (max 10MB)'}
                        </span>
                      </label>
                    </div>
                    {errors.file && (
                      <p className="text-red-500 text-sm mt-1">{errors.file}</p>
                    )}
                    {formData.file && (
                      <p className="text-gray-500 text-sm mt-1">
                        File size: {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    )}
                  </div>

                  <NeonButton
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Quote Request
                      </>
                    )}
                  </NeonButton>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
