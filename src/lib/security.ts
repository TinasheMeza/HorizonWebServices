// Security utilities for form validation and sanitization

/**
 * Sanitizes input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates phone number (South African format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+27|0)[1-9]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Rate limiting check (client-side - server should also implement)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  return true
}

/**
 * Validates file upload
 */
export function validateFile(file: File, maxSizeMB: number = 10, allowedTypes: string[] = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'zip']): { valid: boolean; error?: string } {
  // Check file size
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` }
  }

  // Check file type
  const extension = file.name.split('.').pop()?.toLowerCase()
  if (!extension || !allowedTypes.includes(extension)) {
    return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` }
  }

  return { valid: true }
}
