/** 预设的忽略模式示例, 供教程使用 */
export const PRESET_PATTERNS: { label: string; patterns: string }[] = [
  {
    label: '安全基础',
    patterns: '# 环境变量和密钥\n.env\n.env.*\ncredentials.json\nsecrets/',
  },
  {
    label: '构建产物',
    patterns: '# 构建输出\ndist/\nbuild/\ncoverage/',
  },
  {
    label: '依赖和缓存',
    patterns: '# 依赖和临时文件\nnode_modules/\ntmp/\nlogs/',
  },
];
