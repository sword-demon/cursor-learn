---
title: "Git 双仓库推送: 一份代码, 两个家"
topic: "git-dual-remote"
time_span: "2026"
narrative_approach: "character-focused"
recommended_style: "ohmsha"
recommended_layout: "dense"
aspect_ratio: "3:4"
language: "zh"
page_count: 6
generated: "2026-02-14 12:00"
---

# Git 双仓库推送 - 知识漫画分镜

**Character Reference**: characters/characters.png

---

## Cover

**Filename**: 00-cover-git-dual-remote.png
**Core Message**: 一份代码, 同时推送到两个远程仓库

**Visual Design**:
- 大雄站在中间, 左右各一扇任意门
- 左边蓝色门上写着 "GitCode", 右边黑色门上写着 "GitHub"
- 哆啦A梦在上方飞翔, 手持代码箱子
- 标题: "一份代码, 两个家"
- 副标题: "Git 双仓库推送指南"
- 水印: @sword-demon

---

## Page 1 / 6 - "大雄的烦恼: 代码只有一个家"

**Filename**: 01-page-problem.png
**Layout**: dense
**Core Message**: 引出问题 - 代码只推送到一个仓库不够安全

### Panel Layout

**Panel Count**: 6
**Layout Type**: 3x2 grid

#### Panel 1 (Top-left)
**Scene**: 大雄房间, 电脑前
**Image**: 大雄坐在电脑前, 屏幕显示 GitCode 仓库页面, 表情满足
**Text**: 旁白框「大雄把项目推送到了 GitCode...」

#### Panel 2 (Top-center)
**Scene**: 大雄房间
**Image**: 大雄突然紧张, 冒冷汗, 想象气泡中 GitCode 服务器着火
**Text**: 大雄: "万一 GitCode 挂了怎么办?!"

#### Panel 3 (Top-right)
**Scene**: 大雄房间
**Image**: 大雄抱头, 螺旋眼, 问号飘在头上
**Text**: 大雄: "我想把代码也放到 GitHub 上, 但 origin 已经被占了啊!"

#### Panel 4 (Bottom-left)
**Scene**: 大雄房间门口
**Image**: 哆啦A梦从门口探出头, 自信微笑
**Text**: 哆啦A梦: "大雄, 这个简单!"

#### Panel 5 (Bottom-center)
**Scene**: 大雄房间
**Image**: 哆啦A梦伸手进四次元口袋, 发光特效
**Text**: 哆啦A梦: "让我掏出..."

#### Panel 6 (Bottom-right)
**Scene**: 大雄房间, 特写
**Image**: 哆啦A梦举起一个发光的道具 - 两扇微型任意门, 上面分别标着 "origin" 和 "github"
**Text**: 哆啦A梦: "双重任意门! 一个 remote 名字对应一扇门!"

**Page Hook**: 道具登场, 引出 remote 概念

---

## Page 2 / 6 - "查看现有的门: git remote -v"

**Filename**: 02-page-remote-check.png
**Layout**: dense
**Core Message**: 用 git remote -v 查看当前远程仓库配置

### Panel Layout

**Panel Count**: 6
**Layout Type**: 3x2 grid

#### Panel 1 (Top-left)
**Scene**: 隐喻空间 - 大雄家变成代码仓库
**Image**: 大雄家门口只有一扇蓝色任意门, 门牌写着 "origin"
**Text**: 旁白框「先看看现在有几扇门...」

#### Panel 2 (Top-center)
**Scene**: 隐喻空间
**Image**: 大雄用放大镜检查门上的标签, 全息投影显示:
origin → gitcode.com
**Text**: 命令框: `git remote -v`

#### Panel 3 (Top-right)
**Scene**: 隐喻空间
**Image**: 全息屏幕放大显示详细信息:
origin https://gitcode.com/... (fetch)
origin https://gitcode.com/... (push)
**Text**: 大雄: "果然只有一扇门..."

#### Panel 4 (Bottom-left)
**Scene**: 隐喻空间
**Image**: 哆啦A梦指着门旁边的空地, 画出虚线框
**Text**: 哆啦A梦: "这里可以再开一扇门!"

#### Panel 5 (Bottom-center)
**Scene**: 隐喻空间
**Image**: 哆啦A梦解释概念, 头顶浮现示意图: remote名称 → URL地址
**Text**: 哆啦A梦: "每个 remote 就是一扇门, 名字不同, 通往不同的仓库!"

#### Panel 6 (Bottom-right)
**Scene**: 隐喻空间
**Image**: 大雄恍然大悟, 眼睛发光, 放射线背景
**Text**: 大雄: "所以 origin 这个名字已经被 GitCode 用了, 我需要起个新名字!"

**Page Hook**: 理解了 remote 概念, 准备添加新门

---

## Page 3 / 6 - "开启新门: git remote add"

**Filename**: 03-page-remote-add.png
**Layout**: dense
**Core Message**: 用 git remote add 添加第二个远程仓库

### Panel Layout

**Panel Count**: 6
**Layout Type**: 3x2 grid

#### Panel 1 (Top-left)
**Scene**: 隐喻空间
**Image**: 哆啦A梦从口袋掏出一扇黑色任意门, 闪闪发光, GitHub 猫标志
**Text**: 哆啦A梦: "这扇门通往 GitHub!"

#### Panel 2 (Top-center)
**Scene**: 隐喻空间
**Image**: 哆啦A梦在门上贴标签 "github", 大雄在旁边看
**Text**: 命令框: `git remote add github git@github.com:sword-demon/cursor-learn.git`

#### Panel 3 (Top-right)
**Scene**: 隐喻空间
**Image**: 两扇门并排站立 - 蓝色门(origin/GitCode) 和 黑色门(github/GitHub)
**Text**: 旁白框「现在有两扇门了!」

#### Panel 4 (Bottom-left)
**Scene**: 隐喻空间
**Image**: 大雄再次用放大镜检查, 全息屏幕显示两行
**Text**: 命令框: `git remote -v`

#### Panel 5 (Bottom-center)
**Scene**: 隐喻空间
**Image**: 全息屏幕显示完整输出:
github git@github.com:... (fetch/push)
origin https://gitcode.com/... (fetch/push)
**Text**: 大雄: "两个 remote 都在了!"

#### Panel 6 (Bottom-right)
**Scene**: 隐喻空间
**Image**: 大雄兴奋跳起, 哆啦A梦竖起大拇指, 两扇门在背景发光
**Text**: 哆啦A梦: "接下来, 把代码送过去!"

**Page Hook**: 门已就位, 准备推送

---

## Page 4 / 6 - "首次推送: git push -u"

**Filename**: 04-page-first-push.png
**Layout**: dense
**Core Message**: 首次推送到 GitHub 并设置上游跟踪

### Panel Layout

**Panel Count**: 6
**Layout Type**: 3x2 grid

#### Panel 1 (Top-left)
**Scene**: 隐喻空间 - 传送带场景
**Image**: 大雄把一个标着 "main" 的代码箱子放上传送带, 传送带通向黑色门(GitHub)
**Text**: 命令框: `git push -u github main`

#### Panel 2 (Top-center)
**Scene**: 隐喻空间
**Image**: 箱子穿过黑色任意门, 发光粒子效果, 门上显示连接动画
**Text**: 旁白框「代码正在传送中...」

#### Panel 3 (Top-right)
**Scene**: 隐喻空间
**Image**: 门的另一边 - GitHub 仓库空间, 箱子安全到达, 绿色对勾
**Text**: 输出框: `* [new branch] main -> main`

#### Panel 4 (Bottom-left)
**Scene**: 隐喻空间
**Image**: 哆啦A梦指着 -u 标志, 它变成一条金色丝线连接大雄和黑色门
**Text**: 哆啦A梦: "-u 就是设置'默认通道', 以后推送更方便!"

#### Panel 5 (Bottom-center)
**Scene**: 隐喻空间
**Image**: 全息显示: `branch 'main' set up to track 'github/main'`
**Text**: 输出框: `branch 'main' set up to track 'github/main'`

#### Panel 6 (Bottom-right)
**Scene**: 隐喻空间
**Image**: 大雄站在两扇门中间, 两条金色丝线分别连向两扇门, 表情自豪
**Text**: 大雄: "我的代码现在有两个家了!"

**Page Hook**: 首次推送成功, 进入日常操作

---

## Page 5 / 6 - "日常操作: 推送与拉取"

**Filename**: 05-page-daily-ops.png
**Layout**: dense
**Core Message**: 日常推送和拉取的命令

### Panel Layout

**Panel Count**: 8
**Layout Type**: 4x2 grid (更密集)

#### Panel 1 (Row1-left)
**Scene**: 隐喻空间
**Image**: 大雄把箱子推向蓝色门, 箭头指向门
**Text**: 命令框: `git push origin main`
标签: "推送到 GitCode"

#### Panel 2 (Row1-center-left)
**Scene**: 隐喻空间
**Image**: 大雄把箱子推向黑色门, 箭头指向门
**Text**: 命令框: `git push github main`
标签: "推送到 GitHub"

#### Panel 3 (Row1-center-right)
**Scene**: 隐喻空间
**Image**: 大雄同时推两个箱子, 分别飞向两扇门, 速度线
**Text**: 命令框: `git push origin main && git push github main`

#### Panel 4 (Row1-right)
**Scene**: 隐喻空间
**Image**: 哆啦A梦竖起手指, 提示气泡
**Text**: 哆啦A梦: "同时推送, 两边都是最新的!"

#### Panel 5 (Row2-left)
**Scene**: 隐喻空间
**Image**: 蓝色门打开, 箱子飞向大雄, 大雄伸手接住
**Text**: 命令框: `git pull origin main`
标签: "从 GitCode 拉取"

#### Panel 6 (Row2-center-left)
**Scene**: 隐喻空间
**Image**: 黑色门打开, 箱子飞向大雄
**Text**: 命令框: `git pull github main`
标签: "从 GitHub 拉取"

#### Panel 7 (Row2-center-right)
**Scene**: 隐喻空间
**Image**: 对比图: push(箭头向外) vs pull(箭头向内), 简洁示意
**Text**: 旁白框「push = 送出去, pull = 拿回来」

#### Panel 8 (Row2-right)
**Scene**: 隐喻空间
**Image**: 大雄自信地操作, 哆啦A梦在旁边点头
**Text**: 大雄: "这也太简单了吧!"

**Page Hook**: 掌握日常操作, 进入总结

---

## Page 6 / 6 - "大雄学会了: 双仓库管理全景"

**Filename**: 06-page-summary.png
**Layout**: dense
**Core Message**: 总结回顾, 大雄展示学到的知识

### Panel Layout

**Panel Count**: 6
**Layout Type**: 3x2 grid

#### Panel 1 (Top-left, 大面板)
**Scene**: 全景 - 大雄的代码世界
**Image**: 俯瞰图: 大雄站在中心, 左边蓝色门(origin/GitCode), 右边黑色门(github/GitHub), 传送带连接, 代码箱子整齐排列
**Text**: 旁白框「大雄的仓库配置全景」

#### Panel 2 (Top-center)
**Scene**: 信息面板
**Image**: 全息卡片显示仓库配置表:
| 名称 | 平台 | 协议 |
| origin | GitCode | HTTPS |
| github | GitHub | SSH |
**Text**: 标题: "远程仓库一览"

#### Panel 3 (Top-right)
**Scene**: 大雄特写
**Image**: 大雄自信地对着读者竖大拇指, 放射线背景, 眼睛闪光
**Text**: 大雄: "记住: origin 被占了就换个名字!"

#### Panel 4 (Bottom-left)
**Scene**: 命令速查
**Image**: 全息屏幕显示命令速查卡:
添加: git remote add [名字] [地址]
推送: git push [名字] main
拉取: git pull [名字] main
**Text**: 哆啦A梦: "三条命令搞定一切!"

#### Panel 5 (Bottom-center)
**Scene**: 回调开头
**Image**: 大雄想象气泡中, 之前担心的服务器着火场景, 但现在打了个大叉, 旁边是两个绿色对勾
**Text**: 大雄: "现在就算一个挂了, 另一个还在!"

#### Panel 6 (Bottom-right)
**Scene**: 结尾
**Image**: 大雄和哆啦A梦一起坐在两扇任意门之间, 夕阳背景, 温馨氛围
**Text**: 哆啦A梦: "下次教你用 Git 分支哦~"
水印: @sword-demon

**Page Hook**: 完美收尾, 暗示下一个话题
