"use client";

import { isValidUrl } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SafeImageProps {
  src: string | null | undefined;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onError?: () => void;
}

const DEFAULT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  placeholder = DEFAULT_PLACEHOLDER,
  onError,
}: SafeImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(() => {
    if (!src || !isValidUrl(src)) {
      return placeholder;
    }
    return src;
  });
  const [hasError, setHasError] = useState(false);

  // Reset error state and update image source when src prop changes
  useEffect(() => {
    if (!src || !isValidUrl(src)) {
      setImageSrc(placeholder);
      setHasError(false);
      return;
    }

    // Only update if it's a different URL
    if (src !== imageSrc || hasError) {
      setImageSrc(src);
      setHasError(false);
    }
  }, [src, placeholder, imageSrc, hasError]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(placeholder);
      onError?.();
    }
  };

  const imageProps = fill
    ? { fill: true as const }
    : {
        width: width || 400,
        height: height || 300,
      };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      {...imageProps}
      className={className}
      onError={handleError}
      unoptimized={imageSrc.startsWith("data:")}
    />
  );
}
