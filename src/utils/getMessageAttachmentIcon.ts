import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  Mic,
  Paperclip,
} from "lucide-react";
import type { TMessageAttachment } from "../types/schemas";

// TODO: Migrate to react-icons
const AttachmentIcon: Record<TMessageAttachment, React.ElementType> = {
  image: ImageIcon,
  pdf: FileTextIcon,
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
