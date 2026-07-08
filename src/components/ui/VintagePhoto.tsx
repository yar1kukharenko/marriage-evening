import type { ResponsiveImageData } from "../../lib/images";
import { VintageBorder } from "../decor/VintageBorder";
import { ResponsiveImage } from "./ResponsiveImage";

type AspectRatio = "square" | "portrait" | "landscape" | "wide";

type PhotoVariant = "photo" | "illustration";

type VintagePhotoProps = ResponsiveImageData & {
  aspect?: AspectRatio;
  variant?: PhotoVariant;
  withBorder?: boolean;
  priority?: boolean;
  className?: string;
};

const aspectClasses: Record<AspectRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

export function VintagePhoto({
  src,
  srcSet,
  sizes,
  width,
  height,
  alt,
  aspect = "landscape",
  variant = "photo",
  withBorder = false,
  priority = false,
  className = "",
}: VintagePhotoProps) {
  const image = (
    <ResponsiveImage
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      alt={alt}
      priority={priority}
      className={`h-full w-full object-cover ${variant === "photo" ? "photo-vintage" : ""}`}
    />
  );

  const wrapper = (
    <div
      className={`overflow-hidden rounded-sm ${aspectClasses[aspect]} ${className}`}
    >
      {image}
    </div>
  );

  if (withBorder) {
    return <VintageBorder className="p-2">{wrapper}</VintageBorder>;
  }

  return wrapper;
}
