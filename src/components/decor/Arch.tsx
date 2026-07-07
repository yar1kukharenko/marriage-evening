import topGarland from '../../assets/decor/top-garland.png'

type ArchProps = {
  className?: string
}

/**
 * Ботаническая гирлянда-арка — декоративный акцент над именами на обложке
 * (вдохновение: референс с цветочной аркой).
 */
export function Arch({ className = '' }: ArchProps) {
  return <img src={topGarland} alt="" aria-hidden="true" className={`object-contain ${className}`} />
}
