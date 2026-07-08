import type { ResponsiveImageData } from "../../lib/images";

type ResponsiveImageProps = ResponsiveImageData & {
  priority?: boolean;
  className?: string;
};

export function ResponsiveImage({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  priority = false,
  className = "",
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
