export interface ISendMessageParams {
  content: string;
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
