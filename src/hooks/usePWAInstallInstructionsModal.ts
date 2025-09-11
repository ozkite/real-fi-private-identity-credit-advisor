"use client";

import bowser from "bowser";
import { useEffect, useState } from "react";
import useIsPWA from "./useIsPWA";

const usePWAInstallInstructionsModal = () => {
  const browser = bowser.getParser(navigator.userAgent);
  const isDesktop = browser.getPlatformType() === "desktop";
  const { isPWA } = useIsPWA();

  const [
    isPWAInstallInstructionsModalOpen,
    setIsPWAInstallInstructionsModalOpen,
  ] = useState(false);
  const [
    shouldShowPWAInstallInstructionsModal,
    setShouldShowPWAInstallInstructionsModal,
  ] = useState(false);

  useEffect(() => {
    if (isPWA !== null) {
      setShouldShowPWAInstallInstructionsModal(!isDesktop && !isPWA);
    }
  }, [isPWA]);

  return {
    shouldShowPWAInstallInstructionsModal,
    isPWAInstallInstructionsModalOpen,
    setIsPWAInstallInstructionsModalOpen,
  };
};

export default usePWAInstallInstructionsModal;
