import { useEffect, useState } from "react";

export function useTime(tickInterval?: number) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, tickInterval ?? 1000);
    return () => clearInterval(id);
  }, [tickInterval]);

  return now;
}
