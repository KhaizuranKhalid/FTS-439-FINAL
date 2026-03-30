"use client";

import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { forwardRef } from "react";
import { useImageContext } from "@/components/image-provider";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  useNextImage?: boolean;
}

interface ImageParams {
  width?: number;
  height?: number;
  circle?: boolean;
  rounded?: string;
  aspectRatio?: string;
  center?: boolean;
  cleanAlt: string;
}

const getImageUrl = (src: string | undefined, baseUrl: string): string => {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  if (src.startsWith("data:")) {
    return src;
  }

  if (baseUrl) {
    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanSrc = src.startsWith("/") ? src : `/${src}`;
    return `${cleanBaseUrl}${cleanSrc}`;
  }

  return src;
};

/**
 * Parse image parameters from alt text
 * Supports syntax like:
 * - "=100x200" - width x height
 * - "=100" - width only
 * - "=x200" - height only
 * - "circle" - circle mask
 * - "rounded-none", "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-full" - border radius
 * - "aspect-square", "aspect-video", "aspect-[16/9]" - aspect ratio
 * - "center" - center the image horizontally
 */
const parseImageParams = (alt: string | undefined): ImageParams => {
  if (!alt) return { cleanAlt: "" };

  const params: ImageParams = { cleanAlt: alt };
  let cleanAlt = alt;

  // Parse dimensions (=100x200, =100, =x200)
  const dimensionMatch = alt.match(/=(\d+)x(\d+)|=(\d+)x|=x(\d+)|=(\d+)/);
  if (dimensionMatch) {
    const [
      fullMatch,
      widthHeight1,
      widthHeight2,
      widthOnly,
      heightOnly,
      widthAlone,
    ] = dimensionMatch;

    if (widthHeight1 && widthHeight2) {
      // =100x200
      params.width = parseInt(widthHeight1, 10);
      params.height = parseInt(widthHeight2, 10);
    } else if (widthOnly) {
      // =100x (width only, height auto)
      params.width = parseInt(widthOnly, 10);
    } else if (heightOnly) {
      // =x200 (height only, width auto)
      params.height = parseInt(heightOnly, 10);
    } else if (widthAlone) {
      // =100 (width only)
      params.width = parseInt(widthAlone, 10);
    }

    cleanAlt = cleanAlt.replace(fullMatch, "").trim();
  }

  // Parse circle
  if (/\bcircle\b/i.test(alt)) {
    params.circle = true;
    cleanAlt = cleanAlt.replace(/\bcircle\b/i, "").trim();
  }

  // Parse rounded corners
  const roundedMatch = alt.match(
    /\brounded-(none|sm|md|lg|xl|2xl|full)\b|\brounded\b/i
  );
  if (roundedMatch) {
    params.rounded = roundedMatch[0];
    cleanAlt = cleanAlt.replace(roundedMatch[0], "").trim();
  }

  // Parse aspect ratio
  const aspectMatch = alt.match(/\baspect-(square|video|\[[^\]]+\])\b/i);
  if (aspectMatch) {
    params.aspectRatio = aspectMatch[0];
    cleanAlt = cleanAlt.replace(aspectMatch[0], "").trim();
  }

  // Parse center
  if (/\bcenter\b/i.test(alt)) {
    params.center = true;
    cleanAlt = cleanAlt.replace(/\bcenter\b/i, "").trim();
  }

  params.cleanAlt = cleanAlt;
  return params;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      className,
      alt = "",
      src,
      useNextImage = false,
      width: propsWidth,
      height: propsHeight,
      priority,
      quality,
      fill,
      sizes,
      ...props
    },
    ref
  ) => {
    const { baseUrl } = useImageContext();
    const imageUrl = getImageUrl(
      typeof src === "string" ? src : undefined,
      baseUrl
    );

    // Parse image parameters from alt text
    const params = parseImageParams(alt);

    // Merge parameters: parsed params override props
    const width = params.width ?? propsWidth;
    const height = params.height ?? propsHeight;
    const cleanAlt = params.cleanAlt || alt;

    // Build className based on parameters
    const roundedClass = params.rounded || "rounded-md";
    const circleClass = params.circle ? "rounded-full" : "";
    const aspectClass = params.aspectRatio || "";

    const imageClasses = cn(
      !params.circle && roundedClass,
      circleClass,
      aspectClass,
      params.circle && "object-cover",
      className
    );

    // If circle is specified, ensure square dimensions
    let finalWidth = width;
    let finalHeight = height;
    if (params.circle) {
      if (width && !height) {
        finalHeight = width;
      } else if (height && !width) {
        finalWidth = height;
      }
    }

    // Helper function to wrap content in center container if needed
    const wrapWithCenter = (content: React.ReactNode) => {
      if (params.center) {
        return (
          <div className="flex justify-center items-center my-6">{content}</div>
        );
      }
      return content;
    };

    // If aspect ratio is specified without both dimensions
    if (
      params.aspectRatio &&
      ((finalWidth && !finalHeight) || (!finalWidth && finalHeight))
    ) {
      const containerStyle: React.CSSProperties = {};
      if (finalWidth) {
        containerStyle.width =
          typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth;
      }
      if (finalHeight) {
        containerStyle.height =
          typeof finalHeight === "number" ? `${finalHeight}px` : finalHeight;
      }

      return wrapWithCenter(
        <div
          className={cn(
            aspectClass,
            "relative overflow-hidden",
            circleClass,
            !params.circle && roundedClass
          )}
          style={containerStyle}
        >
          <img
            ref={ref}
            className={cn("w-full h-full object-cover", className)}
            alt={cleanAlt}
            src={imageUrl}
            {...props}
          />
        </div>
      );
    }

    if (useNextImage && finalWidth && finalHeight) {
      const numWidth =
        typeof finalWidth === "string" ? parseInt(finalWidth, 10) : finalWidth;
      const numHeight =
        typeof finalHeight === "string"
          ? parseInt(finalHeight, 10)
          : finalHeight;

      return wrapWithCenter(
        <NextImage
          src={imageUrl}
          alt={cleanAlt}
          width={numWidth}
          height={numHeight}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={imageClasses}
          {...(props as any)}
        />
      );
    }

    if (useNextImage && fill) {
      return wrapWithCenter(
        <div
          className={cn(
            "relative",
            aspectClass,
            circleClass,
            !params.circle && roundedClass,
            className
          )}
        >
          <NextImage
            src={imageUrl}
            alt={cleanAlt}
            fill={fill}
            priority={priority}
            quality={quality}
            sizes={sizes}
            className={cn("object-cover", params.circle && "rounded-full")}
            {...(props as any)}
          />
        </div>
      );
    }

    // Standard img tag with inline styles for dimensions
    const inlineStyles: React.CSSProperties = {};
    if (finalWidth) {
      inlineStyles.width =
        typeof finalWidth === "number" ? `${finalWidth}px` : finalWidth;
    }
    if (finalHeight) {
      inlineStyles.height =
        typeof finalHeight === "number" ? `${finalHeight}px` : finalHeight;
    }

    return wrapWithCenter(
      <img
        ref={ref}
        className={imageClasses}
        alt={cleanAlt}
        src={imageUrl}
        style={inlineStyles}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export const getImageUrlWithBase = (src: string | undefined, baseUrl: string) =>
  getImageUrl(src, baseUrl);
