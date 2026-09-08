---
title: 三步部署到 GitHub Pages
date: 2024-11-09 08:00:00 +0800
tags: [GitHub, 部署]
---

本主题是一个标准的 Jekyll 站点，可以直接交给 GitHub Pages 自动构建，
无需在本地安装任何东西。

## 第一步：创建仓库并推送

在 GitHub 上新建仓库，然后：

```bash
git init
git add .
git commit -m "init blog"
git branch -M main
git remote add origin https://github.com/<用户名>/<仓库名>.git
git push -u origin main
```

## 第二步：开启 Pages

1. 打开仓库 **Settings → Pages**；
2. **Source** 选择 `Deploy from a branch`，分支 `main`，目录 `/ (root)`；
3. 保存后等待一两分钟，站点就上线了。

> #### 💡 两种站点
>
> - **用户/组织主页**：仓库名为 `<用户名>.github.io`，访问
>   `https://<用户名>.github.io/`，`baseurl` 留空即可；
> - **项目主页**：其他仓库名，访问 `https://<用户名>.github.io/<仓库名>/`，
>   此时请把 `_config.yml` 里的 `baseurl` 改为 `/<仓库名>`。

## 第三步：写文章

之后每次 `git push`，GitHub Pages 都会自动重新构建。文章与配置的写法见
[欢迎使用 jyywiki-blog]({{ '/2025/05/20/welcome.html' | relative_url }})。

> #### 🚀 进阶
>
> 仓库里也提供了 `.github/workflows/pages.yml`：如果你更喜欢 **GitHub
> Actions** 构建（或需要更多自定义步骤），把 Settings → Pages 的 Source
> 改为 `GitHub Actions` 即可，推送后流水线会自动把产物发布到 Pages。
