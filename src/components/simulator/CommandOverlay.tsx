import { getAllShortcuts, getShortcutDisplay, type ShortcutType } from '../../hooks/useKeyboardShortcuts';
import { Card } from '../common/Card';

interface CommandOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  activeCommand?: ShortcutType;
}

/**
 * 命令快捷键覆盖层
 * 显示当前可用的键盘快捷键
 */
export function CommandOverlay({ isVisible, onClose, activeCommand }: CommandOverlayProps) {
  if (!isVisible) return null;

  const shortcuts = getAllShortcuts();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <Card padding="lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              快捷键参考
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {shortcuts.map(({ type, name, description }) => {
              const isActive = activeCommand === type;
              const display = getShortcutDisplay(type);

              return (
                <div
                  key={type}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#C41E3A]/10 border border-[#C41E3A]'
                      : 'bg-gray-50 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">{name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
                  </div>
                  <kbd className={`px-2 py-1 text-sm font-mono rounded ${
                    isActive
                      ? 'bg-[#C41E3A] text-white'
                      : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-500'
                  }`}>
                    {display}
                  </kbd>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              按 <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Esc</kbd> 关闭此面板
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CommandOverlay;
