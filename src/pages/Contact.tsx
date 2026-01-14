/**
 * Contact Page Component
 * 
 * Features:
 * - Full client-side form validation with inline errors
 * - Animated confirmation modal on successful submission
 * - Email app trigger with pre-filled details
 * - Enhanced submit button with loading states
 * - Accessibility compliant (screen reader friendly)
 */

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Clock, Upload, AlertCircle, Send, Loader2 } from 'lucide-react'
import GlassCard from '@/components/GlassCard'
import ConfirmationModal from '@/components/ConfirmationModal'
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

interface FormDataState {
  name: string
  email: string
  phone: string
  service: string
  budgetRange: string
  projectDescription: string
  file: File | null
}

export default function Contact() {
  const [searchParams] = useSearchParams()
  const preselectedService = searchParams.get('service')
  
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    phone: '',
    service: preselectedService || '',
    budgetRange: '',
    projectDescription: '',
    file: null,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  /**
   * Enhanced form validation with detailed error messages
   * Validates all fields and provides clear, accessible error messages
   */
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., name@example.com)'
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must contain at least 10 digits'
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service'
    }

    // Budget range validation
    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select a budget range'
    }

    // Project description validation
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    } else if (formData.projectDescription.trim().length < 20) {
      newErrors.projectDescription = 'Please provide more details (at least 20 characters)'
    } else if (formData.projectDescription.trim().length > 2000) {
      newErrors.projectDescription = 'Description must be less than 2000 characters'
    }

    // File validation
    if (formData.file && formData.file.size > 10 * 1024 * 1024) {
      newErrors.file = 'File size must be less than 10MB'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Validates a single field (for real-time validation)
   */
  const validateField = (fieldName: string, value: string | File | null) => {
    const newErrors = { ...errors }

    switch (fieldName) {
      case 'name':
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors.name = 'Name is required'
        } else if (typeof value === 'string' && value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters'
        } else {
          delete newErrors.name
        }
        break
      case 'email':
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors.email = 'Email is required'
        } else if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'phone':
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors.phone = 'Phone number is required'
        } else if (typeof value === 'string' && !/^[\d\s\+\-\(\)]+$/.test(value)) {
          newErrors.phone = 'Please enter a valid phone number'
        } else if (typeof value === 'string' && value.replace(/\D/g, '').length < 10) {
          newErrors.phone = 'Phone number must contain at least 10 digits'
        } else {
          delete newErrors.phone
        }
        break
      case 'projectDescription':
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors.projectDescription = 'Project description is required'
        } else if (typeof value === 'string' && value.trim().length < 20) {
          newErrors.projectDescription = 'Please provide more details (at least 20 characters)'
        } else if (typeof value === 'string' && value.trim().length > 2000) {
          newErrors.projectDescription = 'Description must be less than 2000 characters'
        } else {
          delete newErrors.projectDescription
        }
        break
    }

    setErrors(newErrors)
  }

  /**
   * Opens default email application with pre-filled details
   * Triggered after successful form submission
   */
  const openEmailApp = (data: FormDataState) => {
    const businessEmail = 'info@horizonwebservices.co.za'
    const subject = encodeURIComponent(`New Quote Request – ${data.name}`)
    const body = encodeURIComponent(
      `Hello Horizon Web Services,

I would like to request a quote for the following:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service: ${data.service}
Budget Range: ${data.budgetRange}

Project Description:
${data.projectDescription}

${data.file ? `Attached File: ${data.file.name}` : ''}

Thank you for your time and consideration.

Best regards,
${data.name}`
    )

    const mailtoLink = `mailto:${businessEmail}?subject=${subject}&body=${body}`
    
    // Open email client
    window.location.href = mailtoLink
    
    console.log('Email app triggered with pre-filled details')
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

      console.log('Form submitted successfully:', created)

      // Show confirmation modal
      setShowConfirmationModal(true)
      setSubmitStatus('success')
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: preselectedService || '',
          budgetRange: '',
          projectDescription: '',
          file: null,
        })
        setTouchedFields({})
        setErrors({})

        // Reset file input
        const fileInput = document.getElementById('file') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      }, 500)

      // Open email app after confirmation modal is shown (with slight delay)
      setTimeout(() => {
        openEmailApp(formData)
      }, 1000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Handles field blur events for real-time validation
   */
  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }))
    const value = formData[fieldName as keyof typeof formData]
    validateField(fieldName, value as string | File | null)
  }

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Get in Touch</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              {/* Logo and Intro */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">Horizon WEB SERVICES</h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <GlassCard className="transition-all duration-300 hover:border-primary hover:border-2">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900 text-sm sm:text-base">Email Us</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2">Drop us a line anytime</p>
                    <a
                      href="mailto:hello@horizonwebservices.co.za"
                      className="text-gray-600 hover:text-primary transition-colors text-sm sm:text-base break-words"
                    >
                      hello@horizonwebservices.co.za
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="transition-all duration-300 hover:border-primary hover:border-2">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="text-accent" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold mb-1 text-gray-900 text-sm sm:text-base">Business Hours</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2">When we're available</p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Mon-Fri: 9:00 AM - 5:00 PM SAST
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Quick Response Guarantee */}
              <GlassCard className="bg-cyan-50 border-cyan-200/50 transition-all duration-300 hover:border-primary hover:border-2">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Quick Response Guarantee</h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </GlassCard>
            </div>

            {/* Quote Request Form */}
            <div className="lg:col-span-2">
              <GlassCard>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 gradient-text">Request a Quote</h2>

                {/* Confirmation Modal */}
                <ConfirmationModal
                  isOpen={showConfirmationModal}
                  onClose={() => setShowConfirmationModal(false)}
                  title="Request Submitted Successfully!"
                  message="Your request has been successfully submitted. Our team will review it and get back to you shortly. We've also opened your email client to send a copy of your request."
                />

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

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
                          if (touchedFields.name) {
                            validateField('name', e.target.value)
                          }
                        }}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="John Doe"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                          {errors.name}
                        </p>
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
                          if (touchedFields.email) {
                            validateField('email', e.target.value)
                          }
                        }}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                        } focus:outline-none focus:ring-2 transition-colors`}
                        placeholder="john@example.com"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                          {errors.email}
                        </p>
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
                        if (touchedFields.phone) {
                          validateField('phone', e.target.value)
                        }
                      }}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      placeholder="+27 12 345 6789"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.phone}
                      </p>
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
                        errors.service ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      aria-invalid={!!errors.service}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p id="service-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.service}
                      </p>
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
                        errors.budgetRange ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      } focus:outline-none focus:ring-2 transition-colors`}
                      aria-invalid={!!errors.budgetRange}
                      aria-describedby={errors.budgetRange ? 'budgetRange-error' : undefined}
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                    {errors.budgetRange && (
                      <p id="budgetRange-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.budgetRange}
                      </p>
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
                        if (touchedFields.projectDescription) {
                          validateField('projectDescription', e.target.value)
                        }
                      }}
                      onBlur={() => handleBlur('projectDescription')}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.projectDescription ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'
                      } focus:outline-none focus:ring-2 resize-none transition-colors`}
                      placeholder="Tell us about your project requirements, goals, and any specific features you need..."
                      aria-invalid={!!errors.projectDescription}
                      aria-describedby={errors.projectDescription ? 'projectDescription-error' : 'projectDescription-help'}
                    />
                    {errors.projectDescription && (
                      <p id="projectDescription-error" className="text-red-500 text-sm mt-1" role="alert">
                        {errors.projectDescription}
                      </p>
                    )}
                    <p id="projectDescription-help" className={`text-sm mt-1 ${
                      formData.projectDescription.length < 20 || formData.projectDescription.length > 2000
                        ? 'text-amber-600'
                        : 'text-gray-500'
                    }`}>
                      {formData.projectDescription.length} characters (minimum 20, maximum 2000)
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

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none text-sm sm:text-base"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
