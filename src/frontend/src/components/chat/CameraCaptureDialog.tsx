import { useState, useRef } from 'react';
import { Camera, X, RotateCcw, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { useCamera } from '../../camera/useCamera';

interface CameraCaptureDialogProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function CameraCaptureDialog({
  onCapture,
  onClose,
}: CameraCaptureDialogProps) {
  const [capturedImage, setCapturedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    isActive,
    isSupported,
    error,
    isLoading,
    currentFacingMode,
    startCamera,
    stopCamera,
    capturePhoto,
    switchCamera,
    retry,
    videoRef,
    canvasRef,
  } = useCamera({
    facingMode: 'environment',
    quality: 0.9,
  });

  const handleCapture = async () => {
    const photo = await capturePhoto();
    if (photo) {
      setCapturedImage(photo);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUse = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onCapture(file);
    }
  };

  const handleClose = async () => {
    await stopCamera();
    onClose();
  };

  if (isSupported === false) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-lg p-6 text-center">
          <p className="text-lg font-semibold mb-4">Camera not supported</p>
          <p className="text-muted-foreground mb-6">
            Your browser doesn't support camera access. Please select an image file instead.
          </p>
          <div className="space-y-3">
            <Button onClick={() => fileInputRef.current?.click()} className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Select Image File
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Cancel
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>
    );
  }

  if (capturedImage) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Preview</h2>
          <Button size="icon" variant="ghost" onClick={handleClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 bg-muted">
          <img
            src={URL.createObjectURL(capturedImage)}
            alt="Captured"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        <div className="p-4 border-t flex gap-3">
          <Button variant="outline" onClick={handleRetake} className="flex-1">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake
          </Button>
          <Button onClick={handleUse} className="flex-1">
            Use Photo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Take Photo</h2>
        <Button size="icon" variant="ghost" onClick={handleClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 relative bg-black flex items-center justify-center" style={{ minHeight: '400px' }}>
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-background/95 z-10">
            <p className="text-lg font-semibold mb-2">Camera Error</p>
            <p className="text-muted-foreground text-center mb-6">{error.message}</p>
            <div className="space-y-3 w-full max-w-xs">
              <Button onClick={retry} className="w-full">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                Select Image File
              </Button>
            </div>
          </div>
        )}

        {!isActive && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/95 z-10">
            <div className="text-center space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground">Starting camera...</p>
              ) : (
                <>
                  <Button onClick={startCamera} size="lg">
                    <Camera className="h-5 w-5 mr-2" />
                    Start Camera
                  </Button>
                  <div>
                    <Button
                      variant="link"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Or select an image file
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-contain"
          style={{ maxHeight: '100%' }}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {isActive && (
        <div className="p-4 border-t flex items-center justify-center gap-4">
          {currentFacingMode === 'environment' && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => switchCamera('user')}
              disabled={isLoading}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleCapture}
            disabled={isLoading}
            className="rounded-full h-16 w-16"
          >
            <Camera className="h-6 w-6" />
          </Button>
          {currentFacingMode === 'user' && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => switchCamera('environment')}
              disabled={isLoading}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
