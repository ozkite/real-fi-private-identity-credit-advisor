import { FileIcon, ImageIcon, Mic, Paperclip } from "lucide-react";
import type { TMessageAttachment } from "../types/schemas";

const AttachmentIcon: Record<TMessageAttachment, React.ElementType> = {
  image: ImageIcon,
  pdf: FileIcon,
  csv: FileIcon,
  audio: Mic,
};

const getMessageAttachmentIcon = (attachment: TMessageAttachment) => {
  if (!AttachmentIcon[attachment]) {
    return Paperclip;
  }

  return AttachmentIcon[attachment];
};

export default getMessageAttachmentIcon;
