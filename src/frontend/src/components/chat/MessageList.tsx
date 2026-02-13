import { useEffect, useState } from 'react';
import type { ChatMessage, Attachment } from './types';

interface MessageListProps {
  messages: ChatMessage[];
}

function AttachmentDisplay({ attachment }: { attachment: Attachment }) {
  const [objectUrl, setObjectUrl] = useState<string>('');

  useEffect(() => {
    if (attachment.url) {
      setObjectUrl(attachment.url);
    } else if (attachment.data) {
      const url = URL.createObjectURL(attachment.data);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [attachment]);

  if (attachment.type === 'image') {
    return (
      <div className="mt-2">
        <img
          src={objectUrl}
          alt="Attachment"
          className="max-w-full rounded-lg max-h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/assets/generated/default-avatar.dim_200x200.png';
          }}
        />
      </div>
    );
  }

  if (attachment.type === 'audio') {
    return (
      <div className="mt-2">
        <audio controls className="max-w-full" src={objectUrl}>
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }

  if (attachment.type === 'file') {
    return (
      <div className="mt-2 p-3 bg-muted rounded-lg">
        <a
          href={objectUrl}
          download={attachment.name || 'file'}
          className="flex items-center gap-2 text-sm hover:underline"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <div>
            <div className="font-medium">{attachment.name || 'File'}</div>
            {attachment.size && (
              <div className="text-xs text-muted-foreground">
                {(attachment.size / 1024).toFixed(1)} KB
              </div>
            )}
          </div>
        </a>
      </div>
    );
  }

  return null;
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[75%] rounded-2xl px-4 py-2 ${
              message.sender === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground'
            }`}
          >
            {message.text && <p className="text-sm break-words">{message.text}</p>}
            {message.attachments && message.attachments.length > 0 && (
              <div className="space-y-2">
                {message.attachments.map((attachment, idx) => (
                  <AttachmentDisplay key={idx} attachment={attachment} />
                ))}
              </div>
            )}
            <p
              className={`text-xs mt-1 ${
                message.sender === 'user'
                  ? 'text-primary-foreground/70'
                  : 'text-muted-foreground'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
