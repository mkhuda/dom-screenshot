import { useState } from 'react';

interface ScreenshotButtonProps {
  label: string;
  onClick: () => Promise<void>;
}

export function ScreenshotButton({ label, onClick }: ScreenshotButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onClick();
    } catch (error) {
      console.error('Capture failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className="screenshot-btn" onClick={handleClick} disabled={loading}>
      {loading ? '⏳ Processing...' : label}
    </button>
  );
}
