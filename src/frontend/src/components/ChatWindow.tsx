import { useEffect, useRef } from 'react';
import MessageList from './chat/MessageList';
import MessageComposer from './chat/MessageComposer';
import { useChatSession } from '../hooks/useChatSession';
import type { ChatMessage } from './chat/types';

export default function ChatWindow() {
  const { messages, addMessage } = useChatSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (message: ChatMessage) => {
    addMessage(message);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 py-3">
        <h2 className="text-lg font-semibold">Chat</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          <>
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Message Composer */}
      <MessageComposer onSendMessage={handleSendMessage} />
    </div>
  );
}
