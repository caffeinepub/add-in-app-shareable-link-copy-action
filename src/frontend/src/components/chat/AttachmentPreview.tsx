import { X } from 'lucide-react';
import { Button } from '../ui/button';
import type { Attachment } from './types';

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemove: () => void;
}

export default function AttachmentPreview({
  attachment,
  onRemove,
}: AttachmentPreviewProps) {
  if (attachment.type === 'image') {
    return (
      <div className="relative inline-block">
        <img
          src={attachment.url}
          alt="Preview"
          className="max-h-32 rounded-lg border"
        />
        <Button
          size="icon"
          variant="destructive"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (attachment.type === 'audio') {
    return (
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <audio controls className="flex-1" src={attachment.url}>
          Your browser does not support the audio element.
        </audio>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 shrink-0"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (attachment.type === 'file') {
    return (
      <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
        <div className="flex-1">
          <div className="font-medium text-sm">{attachment.name}</div>
          {attachment.size && (
            <div className="text-xs text-muted-foreground">
              {(attachment.size / 1024).toFixed(1)} KB
            </div>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 shrink-0"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return null;
}
