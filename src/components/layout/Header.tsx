import { Link, useLocation } from 'react-router-dom';
import { useProgress } from '../../contexts/ProgressContext';
import { CircularProgress } from '../common/ProgressBar';

export function Header() {
  const location = useLocation();
  const { progress } = useProgress();

  // Calculate overall progress
  const overallProgress = progress
    ? progress.tutorials.length > 0
      ? progress.tutorials.reduce((acc, t) => {
          const totalSteps = 10; // Approximate
          return acc + (t.completedStepIds.length / totalSteps) * 100;
        }, 0) / progress.tutorials.length
      : 0
    : 0;

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/installation', label: '安装指南' },
    { path: '/commands', label: '命令教程' },
    { path: '/rules', label: '规则生成器' },
    { path: '/project', label: '项目实战' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#C41E3A] rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Cursor Tutorial
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">快速入门指南</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#C41E3A]/10 text-[#C41E3A]'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Progress & User */}
          <div className="flex items-center gap-4">
            {progress && (
              <div className="flex items-center gap-2">
                <CircularProgress
                  percentage={overallProgress}
                  size={40}
                  strokeWidth={3}
                  color="primary"
                  showLabel={true}
                />
                <div className="hidden sm:block text-sm">
                  <p className="text-gray-500 dark:text-gray-400">总进度</p>
                  <p className="font-semibold text-[#C41E3A]">
                    {progress.stats.totalTutorialsCompleted} / 4 完成
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="打开菜单"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="flex px-4 py-2 gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#C41E3A]/10 text-[#C41E3A]'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
