"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type ImageErrorContextType = {
  registerImageError: (src: string) => void
  getImageStatus: (src: string) => boolean
  fallbackImage: string
}

const ImageErrorContext = createContext<ImageErrorContextType>({
  registerImageError: () => {},
  getImageStatus: () => false,
  fallbackImage: "/assets/placeholder.svg"
})

export const useImageError = () => useContext(ImageErrorContext)

export const ImageProvider = ({ 
  children,
  fallbackImage = "/assets/placeholder.svg"
}: { 
  children: React.ReactNode
  fallbackImage?: string
}) => {
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set())

  // Register an image as errored
  const registerImageError = (src: string) => {
    setErroredImages(prev => {
      const newSet = new Set(prev)
      newSet.add(src)
      return newSet
    })
  }

  // Check if an image has errored before
  const getImageStatus = (src: string): boolean => {
    return erroredImages.has(src)
  }

  // Provide the context to children
  return (
    <ImageErrorContext.Provider 
      value={{ 
        registerImageError, 
        getImageStatus,
        fallbackImage
      }}
    >
      {children}
    </ImageErrorContext.Provider>
  )
}

export default ImageProvider 