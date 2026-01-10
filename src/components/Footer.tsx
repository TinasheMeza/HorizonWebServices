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
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">Horizon Web Services</h3>
            <p className="text-gray-400 mb-4">
              Professional web design and digital marketing services in South Africa.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="text-primary mt-1 flex-shrink-0" size={20} />
                <a
                  href="mailto:info@horizonwebservices.co.za"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  info@horizonwebservices.co.za
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-primary mt-1 flex-shrink-0" size={20} />
                <a
                  href="tel:+27123456789"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  +27 12 345 6789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-400">
                  Mon - Fri: 9:00 AM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Horizon Web Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
