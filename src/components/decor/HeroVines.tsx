import vineBranch from "../../assets/decor/vine-branch.png";

const vineStyle = { height: "min(125vh, 920px)" };

/**
 * Боковые ботанические ветки в hero — по центру секции слева и справа.
 */
export function HeroVines() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-visible"
      aria-hidden="true"
    >
      <img
        src={vineBranch}
        alt=""
        className="absolute top-1/2 left-0 w-auto -translate-x-[22%] -translate-y-1/2 object-contain opacity-[0.32] sm:opacity-55"
        style={vineStyle}
      />
      <img
        src={vineBranch}
        alt=""
        className="absolute top-1/2 right-0 w-auto translate-x-[22%] -translate-y-1/2 scale-x-[-1] object-contain opacity-[0.32] sm:opacity-55"
        style={vineStyle}
      />
    </div>
  );
}
