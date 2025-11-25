'use client'

import { useState, memo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, MessageSquare, Calendar, MapPin, Send } from 'lucide-react'

export const ContactStatic = memo(function ContactStatic() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-white via-ultra-light-blue to-extra-light-blue">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Ready to{' '}
            <span className="bg-gradient-to-r from-primary-blue to-light-blue bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Contact our team to discuss how our market making services can enhance
            your project's liquidity and trading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div>
            <Card className="shadow-xl border-gray-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send us a message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-200"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company / Project
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-200"
                      placeholder="Your company or project name"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-primary-blue hover:bg-dark-blue text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in touch
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                We're here to help you optimize your market liquidity and trading performance.
                Reach out through any of the channels below, and our team will get back to you promptly.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center text-white mr-4">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">contact@zuvomo.com</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center text-white mr-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Telegram</h4>
                  <p className="text-gray-600">@zuvomo</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center text-white mr-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Schedule a Call</h4>
                  <p className="text-gray-600">Book a consultation</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 bg-primary-blue rounded-lg flex items-center justify-center text-white mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Global Presence</h4>
                  <p className="text-gray-600">Worldwide operations</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="flex flex-col space-y-3">
                <button
                  className="bg-light-blue hover:bg-primary-blue text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  onClick={() => window.open('https://t.me/zuvomo', '_blank')}
                >
                  Join our Telegram
                </button>
                <button
                  className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
                  onClick={() => window.open('#', '_blank')}
                >
                  Download Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary-blue to-light-blue rounded-2xl p-8 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
              Ready to Transform Your Market Liquidity?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join the growing number of projects that trust Zuvomo for their market making needs.
              Let's discuss how we can help enhance your trading ecosystem.
            </p>
            <button
              className="bg-white text-primary-blue hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
              onClick={() => document.querySelector('#contact form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start the Conversation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
})