import { VintagePhoto } from './VintagePhoto'

type CollagePhoto = {
  src: string
  alt: string
}

type PhotoCollageProps = {
  photos: CollagePhoto[]
}

export function PhotoCollage({ photos }: PhotoCollageProps) {
  const [main, ...rest] = photos

  if (!main) return null

  return (
    <div className="px-6 py-8">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <div className="col-span-2 row-span-2 -rotate-1 sm:col-span-2">
          <VintagePhoto src={main.src} alt={main.alt} aspect="portrait" className="shadow-md" />
        </div>
        {rest.map((photo, index) => (
          <div key={photo.src} className={index === 0 ? 'rotate-1' : '-rotate-1'}>
            <VintagePhoto src={photo.src} alt={photo.alt} aspect="square" className="shadow-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
