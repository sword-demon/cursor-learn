import { useState, useMemo } from 'react';
import { useProgress } from '../../contexts/ProgressContext';

type Platform = 'windows' | 'macos';

interface PlatformSwitchProps {
  value?: Platform;
  onChange?: (platform: Platform) => void;
}

// 检测当前操作系统
function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('mac') ? 'macos' : 'windows';
}

export function PlatformSwitch({ value, onChange }: PlatformSwitchProps) {
  const { progress } = useProgress();

  // 计算初始平台: 优先 props, 其次用户偏好, 最后自动检测
  const initialPlatform = useMemo(() => {
    const userOs = progress?.preferences?.os;
    if (userOs === 'macos') return 'macos';
    if (userOs === 'windows' || userOs === 'linux') return 'windows';
    return detectPlatform();
  }, [progress?.preferences?.os]);

  const [internalPlatform, setInternalPlatform] = useState<Platform>(initialPlatform);

  // 受控模式使用 value, 非受控模式使用内部状态
  const platform = value ?? internalPlatform;

  const handleSwitch = (p: Platform) => {
    if (value === undefined) setInternalPlatform(p);
    onChange?.(p);
  };

  return (
    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-0.5 bg-gray-100 dark:bg-gray-800">
      <button
        onClick={() => handleSwitch('windows')}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          platform === 'windows'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        Windows
      </button>
      <button
        onClick={() => handleSwitch('macos')}
        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          platform === 'macos'
            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
        }`}
      >
        macOS
      </button>
    </div>
  );
}
