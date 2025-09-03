"use client";

import { useEffect } from "react";

const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .then(
          (registration) => {
            console.log(
              "Service worker registration succeeded:",
              registration.scope,
            );
          },
          (error) => {
            console.error("Service worker registration failed:", error);
          },
        );
    } else {
      console.error("Service workers are not supported.");
    }
  }, []);

  return null;
};

export default ServiceWorkerRegistration;
