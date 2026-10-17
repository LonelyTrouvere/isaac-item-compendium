import { useEffect, useRef } from "react";
import useOnScreen from "../lib/use-on-screen";

export default function Pagination({ func } : { func: CallableFunction}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      func();
    }
  }, [isVisible])

  return (
    <div ref={ref} className="paginator">
      <span className="paginator__circle" aria-hidden="true" />
    </div>
  );
}
