import type { ResponsiveImageData } from '../../lib/images'
import { VintagePhoto } from './VintagePhoto'

type PhotoCollageProps = {
  photos: ResponsiveImageData[]
}

export function PhotoCollage({ photos }: PhotoCollageProps) {
  const [main, ...rest] = photos

  if (!main) return null

  return (
    <div className="px-6 py-8">
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        <div className="col-span-2 row-span-2 -rotate-1 sm:col-span-2">
          <VintagePhoto {...main} aspect="portrait" className="shadow-md" />
        </div>
        {rest.map((photo, index) => (
          <div key={photo.src} className={index === 0 ? 'rotate-1' : '-rotate-1'}>
            <VintagePhoto {...photo} aspect="square" className="shadow-sm" />
          </div>
        ))}
      </div>
    </div>
  )
}
