"use client";

import { Toaster as Sonner } from "sonner";

const Toaster = () => {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          fontFamily: 'var(--font-ibm-plex-sans-thai, "IBM Plex Sans Thai", sans-serif)',
        },
      }}
      richColors
      closeButton
    />
  );
};

export { Toaster };
