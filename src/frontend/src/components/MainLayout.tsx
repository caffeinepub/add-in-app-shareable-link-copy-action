import { useState } from 'react';
import { Home, User, MessageCircle } from 'lucide-react';
import ProfilePage from '../pages/ProfilePage';
import MessagesPage from '../pages/MessagesPage';

type Tab = 'feed' | 'profile' | 'chat';

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<Tab>('feed');

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            PhotoShare
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'feed' && (
          <div className="container max-w-2xl mx-auto py-8 px-4">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Welcome to PhotoShare!</p>
              <p className="text-sm text-muted-foreground mt-2">
                The app is being set up. Check your profile to get started.
              </p>
            </div>
          </div>
        )}
        {activeTab === 'profile' && <ProfilePage />}
        {activeTab === 'chat' && <MessagesPage />}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 z-50 w-full border-t bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
              activeTab === 'feed' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
              activeTab === 'chat' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="text-xs font-medium">Chat</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 transition-colors ${
              activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="h-6 w-6" />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
