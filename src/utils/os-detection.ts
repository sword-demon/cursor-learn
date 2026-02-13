// OS detection utilities

export type OSType = 'windows' | 'macos' | 'linux';

/**
 * Detect user's operating system from user agent
 */
export function detectOS(): OSType {
  const userAgent = navigator.userAgent.toLowerCase();

  if (userAgent.includes('win')) {
    return 'windows';
  }
  if (userAgent.includes('mac')) {
    return 'macos';
  }
  return 'linux';
}

/**
 * Get OS-specific keyboard shortcut display
 */
export function getShortcutDisplay(shortcut: string, os: OSType): string {
  if (os === 'macos') {
    return shortcut
      .replace('Ctrl', '⌘')
      .replace('Alt', '⌥')
      .replace('Shift', '⇧');
  }
  return shortcut;
}

/**
 * Get OS-specific download URL for Cursor
 */
export function getCursorDownloadUrl(os: OSType): string {
  const urls = {
    windows: 'https://cursor.sh/downloads/windows',
    macos: 'https://cursor.sh/downloads/mac',
    linux: 'https://cursor.sh/downloads/linux',
  };
  return urls[os];
}
