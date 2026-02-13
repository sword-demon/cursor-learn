/**
 * 编辑器加载状态组件
 * 在编辑器初始化时显示骨架屏
 */
export function EditorLoading({ height = '300px' }: { height?: string }) {
  return (
    <div
      className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse"
      style={{ height }}
    >
      {/* 模拟编辑器头部 */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="ml-3 h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
      </div>
      {/* 模拟代码行 */}
      <div className="p-4 space-y-2 bg-white dark:bg-gray-800">
        <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}
