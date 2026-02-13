import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Loader2 } from 'lucide-react';
import { SiX, SiFacebook, SiInstagram } from 'react-icons/si';

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            PhotoShare
          </CardTitle>
          <CardDescription className="text-base">
            Share your moments with the world
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Login with Internet Identity'
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Secure, decentralized authentication powered by the Internet Computer
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Connect with us</span>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <SiX className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <SiFacebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <SiInstagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
          </div>

          <div className="text-center text-xs text-muted-foreground">
            <p>This app is publicly accessible to everyone.</p>
            <p className="mt-1">No invites or restrictions required.</p>
          </div>
        </CardContent>
      </Card>

      <footer className="fixed bottom-4 left-0 right-0 text-center text-sm text-white/80">
        <p>
          Built with ❤️ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'photoshare-app'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            caffeine.ai
          </a>
        </p>
        <p className="text-xs mt-1">© {new Date().getFullYear()} PhotoShare. All rights reserved.</p>
      </footer>
    </div>
  );
}
