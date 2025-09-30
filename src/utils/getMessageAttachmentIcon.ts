import {
  TbFileTypeCsv,
  TbFileTypePdf,
  TbMicrophone,
  TbPaperclip,
  TbPhoto,
} from "react-icons/tb";
import type { TMessageAttachment } from "../types/schemas";

const AttachmentIcon: Record<TMessageAttachment, React.ElementType> = {
  image: TbPhoto,
  pdf: TbFileTypePdf,
  csv: TbFileTypeCsv,
  audio: TbMicrophone,
};

const getMessageAttachmentIcon = (attachment: TMessageAttachment) => {
  if (!AttachmentIcon[attachment]) {
    return TbPaperclip;
  }

  return AttachmentIcon[attachment];
};

export default getMessageAttachmentIcon;
