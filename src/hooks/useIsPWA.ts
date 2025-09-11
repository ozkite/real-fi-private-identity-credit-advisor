import { useEffect, useState } from "react";

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

const useIsPWA = () => {
  const [isPWA, setIsPWA] = useState<boolean | null>(null);

  useEffect(() => {
    setIsPWA(
      window.matchMedia("(display-mode: standalone)").matches ||
        ("standalone" in window.navigator &&
          Boolean((window.navigator as NavigatorWithStandalone).standalone)),
    );
  }, []);

  return { isPWA };
};

export default useIsPWA;
