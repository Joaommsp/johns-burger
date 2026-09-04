"use client";

import { useSyncExternalStore } from "react";

function semInscricao() {
  return () => {};
}

/**
 * `false` no servidor e no primeiro render do cliente, `true` depois — é o que
 * permite usar `document` (portal, por exemplo) sem divergir na hidratação.
 */
export function useMontado(): boolean {
  return useSyncExternalStore(
    semInscricao,
    () => true,
    () => false,
  );
}
