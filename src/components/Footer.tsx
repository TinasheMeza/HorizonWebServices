import { Link } from 'react-router-dom'
import { Mail, Phone, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  services: [
    { label: 'Custom Websites', path: '/services#websites' },
    { label: 'Web Applications', path: '/services#web-apps' },
    { label: 'Google Ads', path: '/services#google-ads' },
    { label: 'Social Media', path: '/services#social-media' },
  ],
  company: [
    { label: 'About Us', path: '/#about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Contact', path: '/contact' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-3">Horizon Web Services</h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Professional web design and digital marketing services for South African businesses.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-50 hover:bg-primary hover:text-white transition-colors text-gray-600"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <a
                  href="mailto:hello@horizonwebservices.co.za"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  hello@horizonwebservices.co.za
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <a
                  href="tel:+27123456789"
                  className="text-gray-600 hover:text-primary transition-colors text-sm"
                >
                  +27 12 345 6789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span className="text-gray-600 text-sm">
                  Mon - Fri: 9:00 AM - 5:00 PM SAST
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Horizon Web Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
