"use client"

import React, { useState } from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
import Button from "../../atoms/button"

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
          
          <div className="mx-auto max-w-[38rem] rounded-2xl border border-n-6 bg-n-8 p-8 md:p-10">
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
    </Section>
  )
}

export default Contact 