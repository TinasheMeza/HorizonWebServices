import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import NeonButton from './NeonButton'

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setTimeout(() => setShow(true), 1000)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2">Cookie Consent</h3>
                <p className="text-gray-600 text-sm">
                  We use cookies to enhance your browsing experience and analyze our traffic.
                  By clicking "Accept", you consent to our use of cookies.
                </p>
              </div>
              <button
                onClick={handleDecline}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              <NeonButton onClick={handleAccept} className="text-sm">
                Accept
              </NeonButton>
              <NeonButton
                onClick={handleDecline}
                variant="outline"
                className="text-sm"
              >
                Decline
              </NeonButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
