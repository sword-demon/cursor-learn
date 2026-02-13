import { useState, useMemo } from 'react';
import type { KeyboardShortcut, ShortcutCategory } from '../../types';
import {
  keyboardShortcuts,
  shortcutCategoryLabels,
  shortcutCategoryOrder,
} from '../../data/shortcuts/keyboard-shortcuts';
import { PlatformSwitch } from './PlatformSwitch';

type Platform = 'windows' | 'macos';

interface ShortcutTableProps {
  /** 限制显示的分类, 不传则显示全部 */
  categories?: ShortcutCategory[];
}

export function ShortcutTable({ categories }: ShortcutTableProps) {
  const [platform, setPlatform] = useState<Platform>('windows');
  const [search, setSearch] = useState('');

  // 按分类分组并筛选
  const groupedShortcuts = useMemo(() => {
    const order = categories ?? shortcutCategoryOrder;
    const lowerSearch = search.toLowerCase().trim();

    return order
      .map((cat) => {
        let items = keyboardShortcuts.filter((s) => s.category === cat);
        if (lowerSearch) {
          items = items.filter(
            (s) =>
              s.description.toLowerCase().includes(lowerSearch) ||
              s.windowsKey.toLowerCase().includes(lowerSearch) ||
              s.macKey.toLowerCase().includes(lowerSearch)
          );
        }
        return { category: cat, label: shortcutCategoryLabels[cat], items };
      })
      .filter((g) => g.items.length > 0);
  }, [categories, search]);

  const renderKey = (shortcut: KeyboardShortcut) =>
    platform === 'windows' ? shortcut.windowsKey : shortcut.macKey;

  return (
    <div>
      {/* 工具栏: 搜索 + 平台切换 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="搜索快捷键..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/50 focus:border-[#C41E3A]"
          />
        </div>
        <PlatformSwitch value={platform} onChange={setPlatform} />
      </div>

      {/* 快捷键分类表格 */}
      {groupedShortcuts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          没有找到匹配的快捷键
        </p>
      ) : (
        <div className="space-y-6">
          {groupedShortcuts.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C41E3A]" />
                {group.label}
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        功能
                      </th>
                      <th className="text-left py-2 px-4 text-gray-600 dark:text-gray-400 font-medium">
                        快捷键
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((shortcut, idx) => (
                      <tr
                        key={shortcut.id}
                        className={
                          idx < group.items.length - 1
                            ? 'border-b border-gray-100 dark:border-gray-800'
                            : ''
                        }
                      >
                        <td className="py-2.5 px-4 text-gray-700 dark:text-gray-300">
                          {shortcut.description}
                        </td>
                        <td className="py-2.5 px-4">
                          <kbd className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                            {renderKey(shortcut)}
                          </kbd>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
