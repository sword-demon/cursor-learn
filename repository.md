# 仓库配置

## 远程仓库

| 名称 | 平台 | 地址 | 协议 |
|------|------|------|------|
| origin | GitCode | https://gitcode.com/qq_39173140/cursor-learn.git | HTTPS |
| github | GitHub | git@github.com:sword-demon/cursor-learn.git | SSH |

## 日常推送

```bash
# 推送到 GitCode
git push origin main

# 推送到 GitHub
git push github main

# 同时推送到两个仓库
git push origin main && git push github main
```

## 初始配置步骤

```bash
# 1. 项目已有 origin 指向 GitCode
git remote -v
# origin  https://gitcode.com/qq_39173140/cursor-learn.git

# 2. 添加 GitHub 远程仓库
git remote add github git@github.com:sword-demon/cursor-learn.git

# 3. 首次推送并设置上游跟踪
git push -u github main
```

## 拉取代码

```bash
# 从 GitCode 拉取
git pull origin main

# 从 GitHub 拉取
git pull github main
```
