import type { ReactNode } from 'react'
import cornerFlourish from '../../assets/decor/corner-flourish-640.webp'

const CornerOrnament = ({ className = '' }: { className?: string }) => (
  <img
    src={cornerFlourish}
    alt=""
    aria-hidden="true"
    className={`h-16 w-16 object-contain opacity-90 sm:h-20 sm:w-20 ${className}`}
  />
)

type VintageBorderProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
}

/**
 * Рамка с ботаническими угловыми иллюстрациями в винтажном стиле
 * (см. референсы) — оборачивает карточки с ключевым содержимым секции.
 */
export function VintageBorder({
  children,
  className = '',
  innerClassName = '',
}: VintageBorderProps) {
  return (
    <div className={`relative p-6 sm:p-8 ${className}`}>
      <CornerOrnament className="absolute -top-3 -left-3" />
      <CornerOrnament className="absolute -top-3 -right-3 -scale-x-100" />
      <CornerOrnament className="absolute -bottom-3 -right-3 rotate-180" />
      <CornerOrnament className="absolute -bottom-3 -left-3 -rotate-180 scale-x-[-1]" />
      <div className={`relative ${innerClassName}`}>{children}</div>
    </div>
  )
}
