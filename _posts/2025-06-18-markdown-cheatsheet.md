---
title: Markdown 特性速查
date: 2025-06-18 09:00:00 +0800
tags: [Markdown, 排版]
---

这篇文章用于展示主题支持的各种 Markdown 排版元素。

## 标题与正文

二级标题下面就是正文。链接默认使用红色，例如
[jyywiki.cn](https://jyywiki.cn/) 和 [Jekyll 文档](https://jekyllrb.com/docs/)。
**加粗**、*斜体*、~~删除线~~、行内代码 `malloc(64)`、键盘按键
<kbd>Ctrl</kbd>+<kbd>C</kbd>，以及<mark>荧光标记</mark>。

## 提示卡片 (jyywiki 风格)

在引用块第一行放一个 emoji，就会自动变成彩色卡片：

> #### ⏰ 截止日期
>
> **Soft Deadline: 2025 年 6 月 30 日 23:59:59。**
>
> 请不要把作业拖到最后一刻——deadline 是第一生产力，也是第一 bug 来源。

> #### ⚠️ 注意
>
> 直接修改 `.github/workflows/pages.yml` 前先确认你对 GitHub Actions
> 的权限设置，否则流水线可能无法运行。

> #### ❓ 为什么
>
> 因为 GitHub Pages 不允许自定义 Jekyll 插件，所以提示卡片由一小段
> JavaScript 在浏览器里转换完成——这与 jyywiki 服务端生成的效果一致。

> #### 💡 提示
>
> 支持的 emoji 前缀包括：⏰ ⚠️ ❓ 💡 📌 ⭐ ✅ 🎯 等，分别映射到
> 红 / 琥珀 / 蓝 / 绿四种配色。详见 `assets/js/main.js`。

手动指定样式的写法（不依赖 emoji，直接在引用块后附加类名）：

```markdown
> **📖 手动样式**
>
> 这条引用块的样式是手动指定的。
{: .note .note-tip }
```

效果如下：

> **📖 手动样式**
>
> 这条引用块的样式是手动指定的。
{: .note .note-tip }

## 代码高亮

```c
#include <stdio.h>

int main() {
    printf("Hello, world!\n");   // 注释是灰色的
    return 0;                    // 关键字是红色的
}
```

```python
def fibonacci(n: int) -> int:
    """斐波那契数列"""
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

## 数学公式

启用 `mathjax` 后支持 `$...$` 与 `$$...$$`：

行内公式 $e^{i\pi} + 1 = 0$，独立公式：

$$
T(n) = 2T\left(\frac{n}{2}\right) + \Theta(n) = \Theta(n \log n)
$$

## 表格

| 实验 | 主题 | 难度 | 状态 |
|:-----|:-----|:----:|:----:|
| M1   | labyrinth | ★★☆ | ✅ |
| M2   | pstree    | ★★★ | ✅ |
| M3   | sperf     | ★★☆ | ⏳ |

## 列表与引用

1. 有序列表第一项；
2. 有序列表第二项：
   - 无序嵌套项；
   - 另一个嵌套项。

> 这是一段普通的引用，不含 emoji 前缀，因此保持默认样式。

## 脚注

这里是带脚注的句子[^1]。脚注在页面底部自动编号。

[^1]: 这是脚注内容。kramdown 支持 `[^1]:` 语法。

## 图片

![示例示意图]({{ '/assets/img/demo-graph.svg' | relative_url }})

*图 1：一个简单的示意图。*
