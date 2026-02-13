import { getCursorDownloadUrl, type OSType } from '../../utils/os-detection';
import { Button } from '../common/Button';

interface DownloadButtonProps {
  os: OSType;
  osName: string;
  onDownload?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DownloadButton({
  os,
  osName,
  onDownload,
  variant = 'primary',
  size = 'md',
  className = '',
}: DownloadButtonProps) {
  const handleDownload = () => {
    window.open(getCursorDownloadUrl(os), '_blank');
    onDownload?.();
  };

  return (
    <Button
      onClick={handleDownload}
      variant={variant}
      size={size}
      className={className}
      leftIcon={
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      }
    >
      下载 Cursor for {osName}
    </Button>
  );
}
