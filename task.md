x Phase 7: US9 - 快速构建功能教程 (Priority: P1)
x Phase 8: US3 - 扩展管理教程 (Priority: P2)
x Phase 9: US10 - 查找并修复 Bug 教程 (Priority: P2)
x Phase 10: US11 - 审查和测试代码教程 (Priority: P2)
x Phase 11: P3 配置教程 (US4 + US5 + US6)
x Phase 12: P3 Agent 教程 (US12 + US13)
x Phase 13: Polish & Cross-Cutting Concerns
x 使用 /ui-ux-pro-max 和 /frontend-design 针对当前站点进行美化
x 再添加一个github 的远程仓库进行提交代码
x 根据上述推送到 2 个仓库的过程,在根目录下创建对应的操作文档 repository.md
x @repository.md --style ohmsha --layout dense 生成知识漫画
x 优化一下当前项目的 SEO
x 域名换成 cursor-tutorial.wjstar.top; 安装 react-helmet-async 来帮助 SEO
x 根据 @repository.md 在根目录下创建一个 sh 脚本,用于方便提交代码到 2 个仓库
x 根据 spec-kit 的仓库 https://github.com/doggy8088/spec-kit 以及文档地址:https://doggy8088.github.io/spec-kit/, 新增 spec-kit 交互式教程,从安装步骤到 Spec-Driven Development 的开发的流程介绍以及使用案例
x 对 spec-kit 教程的 spec.md, plan.md, tasks.md 进行跨文档一致性分析并修复 TOP 3 问题
x /speckit.implement Phase 2: Foundational (Blocking Prerequisites)
x Phase 3: User Story 1 - Spec-Kit 概念入门与安装指南
x Phase 4: User Story 2 - 核心工作流教程
x Phase 5: User Story 3 - 实战案例演练
x Phase 6: User Story 4 - 辅助命令与进阶技巧
x Phase 7: Polish & Cross-Cutting Concerns
x 根据当前项目在根目录下写一篇合适的推广的微信公众号博文,当前项目已经部署到了 https://cursor-tutorial.wjstar.top 可以进行宣传一波
x 首页的hero 部分的浏览教程的按钮,鼠标悬浮上去,字就看不见了,需要处理
x 再新增一个交互式教程: skill 的使用以及安装以及插件安装和自定义技能介绍,可以着重介绍一下 anthropic 的官方的 skill,以及使用以下 frontend-design 前端 skill 带来的好处
x /speckit.implement Phase 1: Setup (Shared Infrastructure)
x /speckit.implement Phase 2: Foundational (Blocking Prerequisites)
x /speckit.implement User Story 1 - Skill 概念入门与基础使用
x /speckit.implement Phase 4: User Story 2 - Skill 安装与插件管理
x Phase 5: User Story 3 - Anthropic 官方 Skill 介绍
x Phase 6: User Story 4 - frontend-design Skill 深度体验, 案例图片在 @case/ 目录下分别对应三个提示词案例
x 调整 SkillsInstallPage.tsx 页面的 skill 的安装命令，应该是没有的，可以参考 https://code.claude.com/docs/zh-CN/skills 文档页面的 skill 如何编写和使用
x 调整 SkillsOfficialPage.tsx 官方 SKILL 的介绍，请参考 https://github.com/anthropics/skills 官方的 SKILL 仓库，里面有最完整的内容，根据真实的官方 skill repository 进行调整页面交互式教程
x Phase 7: User Story 5 - 自定义 Skill 创建
x Phase 8: Polish & Cross-Cutting Concerns
x /init 重写 CLAUDE.md, 精简冗余内容并补充架构信息
