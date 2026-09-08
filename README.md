# jyywiki-blog

一个仿照 [jyywiki.cn](https://jyywiki.cn/)（蒋炎岩老师的 Wiki）设计风格的
**极简中文博客主题**，基于 Jekyll，可直接部署到 **GitHub Pages**，无需本地
安装任何工具链——push 代码即可自动构建发布。

> 主题不是 jyywiki.cn 的像素级复刻，而是提炼其「内容至上、蓝黑配色、极简
> 排版」的风格：纸白背景、近黑正文、蓝字链接、顶部毛玻璃导航、emoji 彩色提示卡片、
> CC 许可页脚。

## 特性

- **零插件部署**：GitHub Pages 原生 Jekyll 构建，不依赖任何自定义插件；
- **jyywiki 式页面**：主页大标题 + 分区列表、文章页路径条、归档/标签页；
- **彩色提示卡片**：写作时用 `> ⏰ 标题` 即可得到 jyywiki 同款卡片
  （⏰ 红 / ⚠️ 琥珀 / ❓ 蓝 / 💡 绿），转换由一小段 JS 在浏览器完成；
- **数学公式**：MathJax 3 支持 `$...$` 与 `$$...$$`（CDN 可配置）；
- **代码高亮**：Rouge 浅色主题，关键字红色、注释灰色；
- RSS 订阅（`/feed.xml`）、404 页、响应式、打印样式；
- 提供 GitHub Actions 构建流水线（可选）。

## 目录结构

```
├── _config.yml            # 站点配置：标题/导航/URL/许可/备案
├── Gemfile                # 本地预览用（可选）
├── index.html             # 主页
├── archive.html           # 归档（按年份）
├── tags.html              # 标签索引
├── about.md               # 关于页
├── 404.html
├── feed.xml               # RSS
├── _posts/                # ★ 文章目录（Markdown）
├── _layouts/              # 布局：default / home / post / page
├── _includes/             # head / header(路径条) / footer / post-meta / mathjax
├── assets/
│   ├── css/style.scss     # 全部样式
│   ├── js/main.js         # 提示卡片转换等
│   └── img/
└── .github/workflows/pages.yml   # 可选：Actions 发布
```

## 快速开始

### 方式一：直接交给 GitHub Pages（推荐，零配置）

1. 在 GitHub 上新建仓库并推送本目录代码：

   ```bash
   git init
   git add .
   git commit -m "init blog"
   git branch -M main
   git remote add origin https://github.com/<你>/<仓库>.git
   git push -u origin main
   ```

2. 仓库 **Settings → Pages** → Source 选 `Deploy from a branch`，
   分支 `main`、目录 `/ (root)`，保存即可。等待 1–2 分钟访问站点。

3. 按需修改 `_config.yml`：
   - `title` / `subtitle` / `author` / `description`
   - `url`：`https://<用户名>.github.io`
   - **项目主页**（仓库名不是 `<用户名>.github.io`）时，把 `baseurl`
     改为 `/<仓库名>`，例如 `/blog`；
   - `navigation`：顶部导航；`links.github`：右上角 GitHub 链接；
   - `icp`：备案号（国内用户），留空则不显示。

### 方式二：GitHub Actions

把 Settings → Pages 的 Source 改为 `GitHub Actions`，之后每次 push，
仓库里的 `.github/workflows/pages.yml` 会自动构建并发布。

### 本地预览（可选）

需要 Ruby：

```bash
bundle install      # 安装与 GitHub Pages 一致的环境
bundle exec jekyll serve
# 打开 http://127.0.0.1:4000
```

## 写文章

在 `_posts/` 新建 `YYYY-MM-DD-标题.md`：

```markdown
---
title: 我的第一篇文章
date: 2025-06-01 09:00:00 +0800
tags: [随笔, 操作系统]
# author: 覆盖默认作者
# math: false     # 本篇不用数学公式时可关闭
---
正文……
```

支持的 front matter：`title`、`date`、`tags`、`author`、`math`、
`layout`（默认 post）。文章正文支持标准 Markdown、GFM 表格、
` ```c ` 代码高亮、脚注、`$公式$` 等。

### 提示卡片（jyywiki 风格）

正文中把引用块第一行写成 `emoji + 标题` 即可：

```markdown
> #### ⏰ 截止日期
>
> **Soft Deadline: 2025 年 6 月 30 日 23:59:59。**
>
> 记得提前交作业。
```

| 前缀        | 颜色 | 语义             |
|:------------|:----:|:-----------------|
| ⏰ 🗓 📅 🚫 | 红   | 截止 / 危险 / 禁止 |
| ⚠️ ❗       | 琥珀 | 警告 / 注意       |
| ❓ ❔ ℹ️ 🔎 | 蓝   | 提问 / 说明       |
| 💡 ⭐ 📌 ✅ | 绿   | 提示 / 重点       |
| ⚪ 💬 👋    | 灰   | 中性备注          |

约定：**标题与正文用空行（`>`）隔开**，不同的卡片之间也要空一行。
完整的 emoji 映射见 `assets/js/main.js` 顶部的 `CATEGORY` 表。

也可以不依赖 emoji 手动指定（kramdown 块级 IAL）：

```markdown
> **📖 手动样式**
>
> 这条引用块的样式是手动指定的。
{: .note .note-tip }
```

可用类：`note-danger`、`note-warn`、`note-question`、`note-tip`、`note-meta`。

> 提示卡片用少量 JS 转换，是因为 GitHub Pages 禁止自定义 Jekyll 插件；
> 即便禁用了 JS，内容也仍然以普通引用块形式完整可见。

### 小技巧

- 正文中的 `{{ ... }}` / `{% ... %}` 会被 Jekyll 当作模板处理；
  需要展示这类代码时请用 `{% raw %}` 包裹；
- 若国内访问 jsDelivr 慢，修改 `_config.yml` 的 `mathjax_cdn` 换成镜像；
- 图片建议放进 `assets/img/`，正文里用
  `![描述]({{ '/assets/img/xxx.png' | relative_url }})` 引用，这样项目主页
  （带 `baseurl`）下路径也不会错。

## 定制

- **换配色**：`assets/css/style.scss` 顶部 `:root` 里的变量
  （`--accent` 主红、`--bg`、`--fg`、`--line` 等）；
- **改字体**：`--serif` / `--sans` / `--mono`；
- **加页面**：参照 `archive.html` / `tags.html` 写一个带 front matter 的
  `.html` 或 `.md` 文件即可；想在正文里画不同的提示卡颜色，
  直接往 `main.js` 的 `CATEGORY` 里加 emoji。

## 作为主题复用到已有 Jekyll 博客

本仓库本身就是一个可直接运行的完整博客。如果你想把它作为「主题」整合进
已有的 Jekyll 项目，只需拷贝：

```text
_layouts/  _includes/  assets/  404.html  feed.xml
```

并参考本仓库的 `_config.yml`、`_layouts/*`（注意布局通过 front matter
`layout: default` 嵌套，`post/page/home` 均挂在 `default` 之下）。

## 许可

主题代码 MIT 许可；示例文章采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
配色与版式风格致敬 jyywiki.cn（其内容采用 CC BY-NC 4.0）。
