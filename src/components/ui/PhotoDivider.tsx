import type { ResponsiveImageData } from '../../lib/images'
import { ResponsiveImage } from './ResponsiveImage'

type PhotoDividerProps = ResponsiveImageData

export function PhotoDivider({ src, srcSet, sizes, width, height, alt }: PhotoDividerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-cream to-transparent" />
      <ResponsiveImage
        src={src}
        srcSet={srcSet}
        sizes={sizes ?? '100vw'}
        width={width}
        height={height}
        alt={alt}
        className="photo-vintage h-48 w-full object-cover sm:h-64"
      />
    </div>
  )
}
