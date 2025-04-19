"use client"

import React, { useState } from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Button from "../../atoms/button"
import Link from "next/link"
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi"
import { FaFacebookF } from "react-icons/fa"

const contactInfo = [
  {
    icon: <FiPhone className="size-5" />,
    label: "Phone",
    value: "+639976901820",
    href: "tel:+639976901820"
  },
  {
    icon: <FiMail className="size-5" />,
    label: "Email",
    value: "ryanelicowork@gmail.com",
    href: "mailto:ryanelicowork@gmail.com"
  },
  {
    icon: <FiMapPin className="size-5" />,
    label: "Location",
    value: "Bacuag, Surigao del Norte",
    href: "https://maps.google.com/?q=Bacuag,+Surigao+del+Norte,+Philippines"
  }
]

const socialLinks = [
  {
    icon: <FiLinkedin className="size-5" />,
    label: "LinkedIn",
    value: "linkedin.com/in/ryanelico",
    href: "https://www.linkedin.com/in/ryanelico/"
  },
  {
    icon: <FiGithub className="size-5" />,
    label: "GitHub",
    value: "github.com/Ryan-ark",
    href: "https://github.com/Ryan-ark"
  },
  {
    icon: <FaFacebookF className="size-5" />,
    label: "Facebook",
    value: "facebook.com/nasaroryan",
    href: "https://www.facebook.com/nasaroryan"
  }
]

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Thank you for your message! I'll get back to you soon.")
      setFormData({ name: "", email: "", message: "" })
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <Section id="contact" crosses>
      <div className="container">
        <div className="relative z-1">
          <h2 className="h2 mb-6 text-center">Get In Touch</h2>
          <p className="body-1 mb-12 text-center text-n-3">
            Have a question or want to work together? Feel free to reach out!
          </p>
          
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-n-6 bg-n-8 p-8 md:p-10">
              <h3 className="h4 mb-6 text-n-1">Contact Information</h3>
              
              <div className="flex flex-col gap-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-n-6">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-n-3">{contact.label}</h4>
                      <Link
                        href={contact.href}
                        className="text-base text-n-1 transition-colors hover:text-color-1"
                        target={contact.label === "Location" ? "_blank" : undefined}
                        rel={contact.label === "Location" ? "noopener noreferrer" : undefined}
                      >
                        {contact.value}
                      </Link>
                    </div>
                  </div>
                ))}

                <h3 className="h4 mb-4 mt-6 text-n-1">Social Media</h3>
                
                {/* Social Media Links - Better Layout */}
                <div className="flex flex-wrap items-center gap-4 border border-n-6 rounded-xl p-4 bg-n-7/30">
                  {socialLinks.map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="flex items-center gap-3 py-2 px-4 rounded-lg bg-n-6 hover:bg-n-5 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="flex size-8 items-center justify-center rounded-full bg-n-5/50">
                        {social.icon}
                      </div>
                      <span className="text-sm font-medium text-n-1">{social.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl border border-n-6 bg-n-8 p-8 md:p-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="mb-2 block text-sm text-n-3">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-n-6 bg-n-7 px-4 py-3 text-n-1 outline-none transition-colors focus:border-n-5"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="mb-2 block text-sm text-n-3">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-n-6 bg-n-7 px-4 py-3 text-n-1 outline-none transition-colors focus:border-n-5"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="mb-8">
                  <label htmlFor="message" className="mb-2 block text-sm text-n-3">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-n-6 bg-n-7 px-4 py-3 text-n-1 outline-none transition-colors focus:border-n-5"
                    placeholder="Hello, I'd like to talk about..."
                    rows={5}
                  />
                </div>
                
                <div className="text-center">
                  <Button type="submit" className="min-w-[10rem]" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                  
                  {submitMessage && (
                    <p className="mt-4 text-center text-color-1">{submitMessage}</p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact 