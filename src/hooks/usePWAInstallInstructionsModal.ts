"use client";

import bowser from "bowser";
import { useEffect, useState } from "react";

const usePWAInstallInstructionsModal = () => {
  const browser = bowser.getParser(navigator.userAgent);
  const isDesktop = browser.getPlatformType() === "desktop";

  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [
    isPWAInstallInstructionsModalOpen,
    setIsPWAInstallInstructionsModalOpen,
  ] = useState(false);
  const [
    shouldShowPWAInstallInstructionsModal,
    setShouldShowPWAInstallInstructionsModal,
  ] = useState(false);

  useEffect(() => {
    setIsPWAInstalled(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  useEffect(() => {
    setShouldShowPWAInstallInstructionsModal(!isDesktop && !isPWAInstalled);
  }, [isPWAInstalled]);

  return {
    shouldShowPWAInstallInstructionsModal,
    isPWAInstallInstructionsModalOpen,
    setIsPWAInstallInstructionsModalOpen,
  };
};

export default usePWAInstallInstructionsModal;
