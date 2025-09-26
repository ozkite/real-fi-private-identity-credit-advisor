export interface ISendMessageParams {
  content: string;
  shouldUseWebSearch?: boolean;
  attachmentData?: {
    imageDataUrl?: string;
    pdfTextContent?: string | null;
  };
}

export interface IChatInputProps {
  onSendMessage: (message: ISendMessageParams) => void;
  isLoading: boolean;
  placeholder?: string;
  showActionButtons?: boolean;
}
