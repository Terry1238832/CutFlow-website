# CutFlow 宣传与下载页

CutFlow 的公开下载页面。此仓库仅包含网站和公开分发的应用安装包，不包含 macOS 应用源码。

## 网站

纯 HTML、CSS 与 JavaScript，无第三方运行时依赖、外部字体或追踪脚本。包含响应式布局、可点击的文件移动演示、滚动进入动效、安装说明、常见问题以及完整测试报告。系统开启“减少动态效果”时会停用过渡与动画。

## 发布

GitHub Pages：Settings → Pages → Deploy from a branch → main → /(root)。根目录的 `.nojekyll` 使静态文件直接发布。

本地预览：`python3 -m http.server 8765`，然后打开 `http://localhost:8765/`。

## 更新下载版本

1. 将经过验证的安装包保存为 `CutFlow-macOS.zip`。
2. 同步 `index.html` 的版本、大小、日期、更新说明与安装要求。
3. 更新 `TESTING.md`、`testing.html` 与 `SHA256SUMS.txt`。
4. 核对包的 SHA-256、网页本地链接和 JavaScript 语法。
5. 提交到 main，等待 GitHub Pages 部署成功。

当前版本：1.1.3（build 6），macOS 13+，Apple Silicon / Intel 通用包。使用临时签名，未经 Apple 公证，首次打开需手动批准。功能验证范围见 [测试报告](TESTING.md)。
