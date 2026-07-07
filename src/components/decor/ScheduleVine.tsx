import vineBranch from "../../assets/decor/vine-branch.png";

const vineStyle = { height: "min(125vh, 920px)" };

/**
 * Ботаническая ветка справа от секции расписания.
 */
export function ScheduleVine() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 -ml-[50vw] w-screen overflow-visible"
      aria-hidden="true"
    >
      <img
        src={vineBranch}
        alt=""
        className="absolute top-1/2 right-6 w-auto translate-x-[10%] -translate-y-1/2 scale-x-[-1] object-contain opacity-[0.32] sm:opacity-55"
        style={vineStyle}
      />
    </div>
  );
}
