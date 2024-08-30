"use client";

import { useEffect, useState } from "react";

export function RefreshCache({ check }: { check: () => Promise<void> }) {
  const [shouldRun, setShouldRun] = useState(true);

  useEffect(() => {
    const onFocus = () => setShouldRun(true);
    const onBlur = () => setShouldRun(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });

  useEffect(() => {
    if (!shouldRun) return;

    const interval = setInterval(() => {
      void check();
    }, 1000);

    return () => clearInterval(interval);
  }, [check, shouldRun]);

  return null;
}
