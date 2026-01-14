/**
 * Confirmation Modal Component
 * 
 * Displays an animated confirmation message after form submission.
 * Features:
 * - Smooth fade and scale animations
 * - Professional, trustworthy design
 * - Accessible (ARIA compliant)
 * - Auto-dismiss option
 */

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
  autoCloseDelay?: number // milliseconds, 0 to disable
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  title = 'Request Submitted Successfully!',
  message = 'Your request has been successfully submitted. Our team will review it and get back to you shortly.',
  autoCloseDelay = 0, // Disabled by default
}: ConfirmationModalProps) {
  // Auto-close functionality
  useEffect(() => {
    if (isOpen && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, autoCloseDelay)

      return () => clearTimeout(timer)
    }
  }, [isOpen, autoCloseDelay, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
                type="button"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center">
                <h2
                  id="modal-title"
                  className="text-2xl font-bold text-gray-900 mb-3"
                >
                  {title}
                </h2>
                <p
                  id="modal-description"
                  className="text-gray-600 leading-relaxed"
                >
                  {message}
                </p>
              </div>

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-gradient-primary text-white rounded-full font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                  type="button"
                >
                  Got it, thanks!
                </button>
              </motion.div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
