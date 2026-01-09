"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState(new Date());
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setShowColon((prev) => !prev);
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <div className="text-6xl flex items-center justify-center font-light tracking-tight tabular-nums">
      {hours}
      <span className={showColon ? "opacity-100" : "opacity-0"}>:</span>
      {minutes}
    </div>
  );
}
