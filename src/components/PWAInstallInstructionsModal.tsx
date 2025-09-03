import bowser from "bowser";
import {
  EllipsisVerticalIcon,
  MenuSquare,
  PlusSquare,
  ShareIcon,
} from "lucide-react";
import { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

const PWAInstallInstructionsModal: React.FC = () => {
  const browser = bowser.getParser(navigator.userAgent);
  const isIOS = browser.getOS().name === "iOS";
  const isSafari = browser.getBrowser().name === "Safari";
  const isChrome = browser.getBrowser().name === "Chrome";

  const getPWAInstallInstructions = () => {
    if (isSafari) {
      return (
        <div className="text-gray-800 flex flex-wrap items-start gap-1">
          <p>To install nilGPT </p>
          <div className="flex flex-col gap-1 list-inside list-decimal">
            <li className="list-item">
              <p className="inline-flex items-center gap-1">
                Click on the share button below{" "}
                <ShareIcon size={18} className="text-blue-500 inline-flex" />
              </p>
            </li>
            <li className="list-item">
              <p className="inline-flex items-center">
                Click on "Add to Home Screen{" "}
                <PlusSquare size={16} className="ml-1" />"
              </p>
            </li>
          </div>
        </div>
      );
    }

    if (isIOS) {
      return (
        <p className="text-gray-800">
          To install nilGPT, please open this website in Safari and then follow
          the installation instructions displayed there.
        </p>
      );
    }

    if (isChrome) {
      return (
        <div className="text-gray-800 flex flex-wrap items-start gap-1">
          <p>To install nilGPT</p>
          <div className="flex flex-col gap-1 list-inside list-decimal">
            <li className="list-item">
              <p className="inline-flex items-center gap-1">
                Click on <EllipsisVerticalIcon size={16} /> or{" "}
                <MenuSquare size={18} />
              </p>
            </li>
            <li className="list-item">
              <p className="inline-flex">Click on "Add to home screen"</p>
            </li>
          </div>
        </div>
      );
    }

    return (
      <p className="text-gray-800">
        To install nilGPT, please open this website in Chrome and then follow
        the installation instructions displayed there.
      </p>
    );
  };

  return (
    <DialogContent className="rounded-lg max-w-3xl max-md:max-w-[calc(100svw-32px)] p-4 bg-[#f7f6f2]">
      <DialogHeader>
        <DialogTitle>Install nilGPT</DialogTitle>
      </DialogHeader>
      {getPWAInstallInstructions()}
    </DialogContent>
  );
};

export default PWAInstallInstructionsModal;
