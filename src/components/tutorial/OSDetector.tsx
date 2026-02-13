import { useState, useEffect } from 'react';
import { detectOS, type OSType } from '../../utils/os-detection';

interface OSOption {
  id: OSType;
  name: string;
  icon: string;
}

const osOptions: OSOption[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: 'M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801',
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z',
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'M12.076 0C5.593 0 .001 5.592.001 12.075c0 6.483 5.592 11.999 12.075 11.999 6.483 0 11.923-5.516 11.923-11.999C24 5.592 18.559 0 12.076 0zm0 22.1c-5.524 0-10.024-4.5-10.024-10.025S6.552 2.05 12.076 2.05s9.975 4.5 9.975 10.025S17.6 22.1 12.076 22.1z',
  },
];

interface OSDetectorProps {
  selectedOS: OSType;
  onSelectOS: (os: OSType) => void;
  autoDetect?: boolean;
}

export function OSDetector({ selectedOS, onSelectOS, autoDetect = true }: OSDetectorProps) {
  const [detectedOS, setDetectedOS] = useState<OSType | null>(null);

  useEffect(() => {
    if (autoDetect) {
      const os = detectOS();
      setDetectedOS(os);
      onSelectOS(os);
    }
  }, [autoDetect, onSelectOS]);

  return (
    <div className="space-y-4">
      {detectedOS && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          检测到您的操作系统: <span className="font-medium text-[#C41E3A]">
            {osOptions.find(os => os.id === detectedOS)?.name}
          </span>
        </p>
      )}

      <div className="grid grid-cols-3 gap-4">
        {osOptions.map((os) => (
          <button
            key={os.id}
            onClick={() => onSelectOS(os.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-200 ${
              selectedOS === os.id
                ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            <svg
              className={`w-8 h-8 mx-auto mb-3 ${
                selectedOS === os.id ? 'text-[#C41E3A]' : 'text-gray-400'
              }`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d={os.icon} />
            </svg>
            <p
              className={`font-medium ${
                selectedOS === os.id
                  ? 'text-[#C41E3A]'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {os.name}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export { osOptions };
export type { OSOption };
