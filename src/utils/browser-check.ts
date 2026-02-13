/**
 * 浏览器兼容性检查
 * 检测必要的浏览器 API 支持
 */

interface BrowserCheckResult {
  supported: boolean;
  missing: string[];
}

export function checkBrowserCompatibility(): BrowserCheckResult {
  const missing: string[] = [];

  // 检查 localStorage
  try {
    localStorage.setItem('__test__', '1');
    localStorage.removeItem('__test__');
  } catch {
    missing.push('localStorage');
  }

  // 检查 ES2020+ 特性
  if (typeof globalThis === 'undefined') {
    missing.push('ES2020 (globalThis)');
  }

  // 检查 ResizeObserver (Monaco Editor 需要)
  if (typeof ResizeObserver === 'undefined') {
    missing.push('ResizeObserver');
  }

  // 检查 IntersectionObserver
  if (typeof IntersectionObserver === 'undefined') {
    missing.push('IntersectionObserver');
  }

  return {
    supported: missing.length === 0,
    missing,
  };
}

/**
 * 检查是否为支持的浏览器
 * 基于 user agent 的粗略检测
 */
export function isSupportedBrowser(): boolean {
  const ua = navigator.userAgent;
  // 排除 IE
  if (ua.includes('MSIE') || ua.includes('Trident/')) return false;
  return true;
}
