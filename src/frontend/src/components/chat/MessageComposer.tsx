import { useState, useRef } from 'react';
import { Camera, Mic, Paperclip, Send, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import CameraCaptureDialog from './CameraCaptureDialog';
import AttachmentPreview from './AttachmentPreview';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import type { ChatMessage, Attachment } from './types';

interface MessageComposerProps {
  onSendMessage: (message: ChatMessage) => void;
}

export default function MessageComposer({ onSendMessage }: MessageComposerProps) {
  const [text, setText] = useState('');
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isRecording,
    recordingDuration,
    startRecording,
    stopRecording,
    audioBlob,
    clearRecording,
    error: recordingError,
  } = useVoiceRecorder();

  const handleSend = () => {
    if (!text.trim() && !attachment) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date(),
      sender: 'user',
      attachments: attachment ? [attachment] : undefined,
    };

    onSendMessage(message);
    setText('');
    setAttachment(null);
    clearRecording();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCameraCapture = (file: File) => {
    const url = URL.createObjectURL(file);
    setAttachment({
      type: 'image',
      data: file,
      url,
      name: file.name,
      size: file.size,
      mimeType: file.type,
    });
    setShowCamera(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const isImage = file.type.startsWith('image/');

    setAttachment({
      type: isImage ? 'image' : 'file',
      data: file,
      url,
      name: file.name,
      size: file.size,
      mimeType: file.type,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const handleRecordingComplete = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAttachment({
        type: 'audio',
        data: audioBlob,
        url,
        name: `recording-${Date.now()}.webm`,
        size: audioBlob.size,
        mimeType: audioBlob.type,
      });
      clearRecording();
    }
  };

  const handleRemoveAttachment = () => {
    if (attachment?.url) {
      URL.revokeObjectURL(attachment.url);
    }
    setAttachment(null);
    clearRecording();
  };

  return (
    <>
      <div className="sticky bottom-0 border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-4">
        {/* Attachment Preview */}
        {attachment && (
          <div className="mb-3">
            <AttachmentPreview
              attachment={attachment}
              onRemove={handleRemoveAttachment}
            />
          </div>
        )}

        {/* Recording State */}
        {isRecording && (
          <div className="mb-3 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                Recording... {recordingDuration}s
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRecordToggle}
            >
              Stop
            </Button>
          </div>
        )}

        {/* Audio Preview */}
        {audioBlob && !attachment && (
          <div className="mb-3">
            <AttachmentPreview
              attachment={{
                type: 'audio',
                data: audioBlob,
                url: URL.createObjectURL(audioBlob),
                name: 'Recording',
                size: audioBlob.size,
              }}
              onRemove={clearRecording}
            />
            <Button
              size="sm"
              className="mt-2 w-full"
              onClick={handleRecordingComplete}
            >
              Use Recording
            </Button>
          </div>
        )}

        {/* Recording Error */}
        {recordingError && (
          <div className="mb-3 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
            {recordingError}
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end gap-2">
          {/* Action Buttons */}
          <div className="flex gap-1 pb-2">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setShowCamera(true)}
              disabled={isRecording || !!attachment}
              className="h-9 w-9"
            >
              <Camera className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleRecordToggle}
              disabled={!!attachment}
              className="h-9 w-9"
            >
              <Mic className={`h-5 w-5 ${isRecording ? 'text-destructive' : ''}`} />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => fileInputRef.current?.click()}
              disabled={isRecording || !!attachment}
              className="h-9 w-9"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              accept="*/*"
            />
          </div>

          {/* Text Input */}
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-32 resize-none"
            rows={1}
            disabled={isRecording}
          />

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={(!text.trim() && !attachment) || isRecording}
            size="icon"
            className="h-10 w-10 shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Camera Dialog */}
      {showCamera && (
        <CameraCaptureDialog
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </>
  );
}
