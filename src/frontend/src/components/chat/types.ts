export type AttachmentType = 'image' | 'audio' | 'file';

export interface Attachment {
  type: AttachmentType;
  data: File | Blob;
  url: string;
  name?: string;
  size?: number;
  mimeType?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
  attachments?: Attachment[];
}
