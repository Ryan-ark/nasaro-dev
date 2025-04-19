"use client"

import { useState, useEffect } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { useImageError } from "../image-provider"

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string
  fallbackClassName?: string
}

const ImageWithFallback = ({
  src,
  alt,
  fallbackSrc,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) => {
  const { registerImageError, getImageStatus, fallbackImage } = useImageError()
  const [error, setError] = useState<boolean>(false)
  
  // Check if this image has already errored in another instance
  useEffect(() => {
    if (src && typeof src === 'string' && getImageStatus(src)) {
      setError(true)
    }
  }, [src, getImageStatus])

  const handleError = () => {
    setError(true)
    if (src && typeof src === 'string') {
      registerImageError(src)
    }
  }

  const actualFallbackSrc = fallbackSrc || fallbackImage

  return (
    <>
      {!error ? (
        <Image
          src={src}
          alt={alt}
          className={className}
          onError={handleError}
          {...props}
        />
      ) : (
        <div 
          className={cn(
            "flex items-center justify-center bg-n-7/50 backdrop-blur-sm rounded-md", 
            className,
            fallbackClassName
          )}
          style={{
            width: props.width ? 
              typeof props.width === 'number' ? `${props.width}px` : props.width 
              : '100%',
            height: props.height ? 
              typeof props.height === 'number' ? `${props.height}px` : props.height 
              : '100%',
          }}
        >
          {actualFallbackSrc ? (
            <Image
              src={actualFallbackSrc}
              alt={`Placeholder for ${alt}`}
              width={props.width && typeof props.width === 'number' ? Math.min(props.width / 2, 100) : 100}
              height={props.height && typeof props.height === 'number' ? Math.min(props.height / 2, 100) : 100}
              className="opacity-70"
            />
          ) : (
            <div className="text-n-1/70 text-center px-4 py-2">
              <span className="block text-xl mb-1">🖼️</span>
              <span className="text-sm">{alt || "Image not found"}</span>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ImageWithFallback 