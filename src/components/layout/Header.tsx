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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-200/60 dark:border-gray-700/40 shadow-lg shadow-black/[0.03] dark:shadow-black/20 px-5">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[#C41E3A] to-[#A01830] rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-shadow duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Cursor Tutorial</h1>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-none">快速入门指南</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path ||
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#C41E3A] bg-primary-50 dark:bg-[#C41E3A]/10'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C41E3A]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Progress & User */}
            <div className="flex items-center gap-4">
              {progress && (
                <div className="flex items-center gap-2.5">
                  <CircularProgress percentage={overallProgress} size={36} strokeWidth={3} color="primary" showLabel={true} />
                  <div className="hidden sm:block text-sm">
                    <p className="text-xs text-gray-400 dark:text-gray-500">总进度</p>
                    <p className="font-semibold text-[#C41E3A] text-sm leading-tight">
                      {progress.stats.totalTutorialsCompleted} / 4
                    </p>
                  </div>
                </div>
              )}
              <button
                className="md:hidden p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label="打开菜单"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-2 mx-auto max-w-7xl">
        <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200/60 dark:border-gray-700/40 overflow-x-auto">
          <div className="flex px-3 py-2 gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-[#C41E3A] dark:bg-[#C41E3A]/10'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}