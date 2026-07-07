type PhotoDividerProps = {
  src: string
  alt: string
}

export function PhotoDivider({ src, alt }: PhotoDividerProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-cream to-transparent" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="photo-vintage h-48 w-full object-cover sm:h-64"
      />
    </div>
  )
}
