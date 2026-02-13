# Cursor Tutorial 站点美化方案

## 设计方向

基于 UI/UX Pro Max 调研结果, 采用 "Developer Tool + Educational App" 混合风格:
- 保留 China Red (#C41E3A) 主题
- 融入 Minimalism + Micro-interactions 风格
- 提升专业感和高级感

## 具体改动

### 1. 字体升级

当前: 系统字体
改为: Space Grotesk (标题) + DM Sans (正文) + JetBrains Mono (代码)

- Space Grotesk 有独特的科技感, 适合开发者工具
- DM Sans 可读性极高, 适合教程正文
- 通过 Google Fonts CDN 引入

### 2. Header 浮动化

当前: 贴顶 sticky header
改为: 浮动导航栏 (floating navbar)

- 添加 top-4 left-6 right-6 间距
- backdrop-blur-xl + bg-white/80 毛玻璃效果
- rounded-2xl 圆角
- 更精致的 active 状态指示器 (底部小圆点替代背景色块)

### 3. Hero 区域增强

当前: 简单渐变背景
改为: 更丰富的视觉层次

- 添加网格背景纹理 (CSS grid pattern)
- 渐变从 primary 到 primary-dark, 叠加径向光晕
- 标题使用更大字号 + 紧凑字间距 (letter-spacing: -0.02em)
- CTA 按钮添加微光效果

### 4. 卡片设计优化

当前: 白底 + 细边框 + 小阴影
改为: 更精致的卡片样式

- 移除边框, 使用更柔和的阴影 (shadow-sm → shadow-md on hover)
- hover 时 translateY(-2px) + shadow 增强
- 添加左侧彩色条纹指示器 (border-left-4)
- 过渡时间 200ms ease-out

### 5. 进度条美化

当前: 简单的红色填充条
改为: 渐变填充 + 动画

- 填充色从 primary-light 到 primary 渐变
- 添加微光扫过动画 (shimmer effect)
- 圆角更大 (rounded-full)

### 6. 间距和排版优化

- 页面内容区 max-w-7xl 统一
- section 间距从 py-8 提升到 py-12/py-16
- 标题和内容间距更大 (mb-2 → mb-4)
- 卡片网格 gap 从 gap-4 提升到 gap-6

### 7. 动画增强

- 页面进入: staggered fade-up (Framer Motion)
- 卡片: hover scale(1.01) + shadow
- 按钮: hover 时微妙的 translateY(-1px)
- 所有动画 150-300ms, 使用 ease-out
- 尊重 prefers-reduced-motion

### 8. 深色模式优化

- 卡片背景: gray-800 → gray-800/50 + backdrop-blur
- 边框: gray-700 → gray-700/50 更柔和
- 文字对比度确保 4.5:1 以上

## 改动文件清单

1. `index.html` - 添加 Google Fonts 引入
2. `src/index.css` - 更新 @theme 变量, 添加自定义动画
3. `src/components/layout/Header.tsx` - 浮动导航栏
4. `src/pages/Home/HomePage.tsx` - Hero 和整体布局优化
5. `src/components/common/Card.tsx` - 卡片样式升级
6. `src/components/common/ProgressBar.tsx` - 进度条美化
7. `src/components/common/Button.tsx` - 按钮微交互

## 不改动

- 路由结构
- 数据模型
- 业务逻辑
- 组件 API (props 接口)
