"use client"

import React from "react"
import Section from "../../layout/section"
import { cn } from "@/lib/utils"
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
  return (
    <Section id="contact" crosses>
      <div className="container">
        <div className="relative z-1">
          <h2 className="h2 mb-6 text-center">Get In Touch</h2>
          <p className="body-1 mb-12 text-center text-n-3">
            Have a question or want to work together? Feel free to reach out!
          </p>
          
          <div className="flex justify-center">
            <div className="rounded-2xl border border-n-6 bg-n-8 p-8 md:p-10 max-w-2xl w-full">
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
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Contact 