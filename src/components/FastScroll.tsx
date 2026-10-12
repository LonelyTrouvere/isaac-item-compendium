export default function FastScroll({
  showScrollTop,
}: {
  showScrollTop: boolean;
}) {
  return (
    <button
      className={`scroll-top ${showScrollTop ? "visible" : ""}`}
      type="button"
      aria-label="Scroll to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        })
      }
    >
      <Icon name="arrowUp" />
      <span>Top</span>
    </button>
  );
}

function Icon({
  name,
}: {
  name: "search" | "chevron" | "sliders" | "close" | "arrowUp";
}) {
  const paths = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m15.5 15.5 5 5" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    sliders: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="2" />
        <circle cx="15" cy="17" r="2" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    arrowUp: (
      <>
        <path d="m6 11 6-6 6 6" />
        <path d="M12 5v14" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {paths[name]}
    </svg>
  );
}
