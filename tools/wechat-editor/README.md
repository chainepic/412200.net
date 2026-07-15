# 微信公众号编辑器（本地部署）

基于 [doocs/md](https://github.com/doocs/md)（12k+ stars），专为公众号排版设计。

## 访问地址

**http://localhost:8899**

## 启动 / 停止

```bash
# 启动
cd tools/wechat-editor && docker compose up -d

# 停止
cd tools/wechat-editor && docker compose down
```

## 使用方法

1. 浏览器打开 http://localhost:8899
2. 点击左上角「导入」→ 选择 `articles/` 目录下的 Markdown 文件
3. 右侧选择主题样式（推荐「优雅」或自定义品牌色）
4. 点击「复制」→ 粘贴到微信公众号编辑器

## 预置文章

| 文件 | 内容 |
| --- | --- |
| `articles/01-ai-solutions.md` | AI 解决方案 |
| `articles/02-brand-building.md` | 品牌建设 |
| `articles/03-pricing.md` | 服务价格 |

## 自定义品牌色

在编辑器右侧「样式」面板中，可修改主题色为 `#D4851F`（接近官网暖橙色）。

## 备选方案

如果 doocs/md 不满足需求，还可以考虑：

| 项目 | Stars | 特点 | 地址 |
| --- | --- | --- | --- |
| [WeMD](https://github.com/tenngoxars/WeMD) | 800+ | 深色模式预览、主题设计器 | edit.wemd.app |
| [huasheng_editor](https://github.com/alchaincyf/huasheng_editor) | 650+ | 13 种样式、图片本地存储 | editor.huasheng.ai |
| [mbeditor](https://github.com/AAAAAnson/mbeditor) | 60+ | AI Agent API、草稿箱同步 | 适合自动化 |
