# Sonnet

公开的英语笔记阅读页，使用 Rosé Pine Dawn / Moon 明暗配色。

从仓库根目录启动：

```sh
pnpm dev:sonnet
```

访问 http://localhost:3001。服务端通过 GitHub Contents API 读取 `chanshiyucx/obsidian` 的 `main` 分支中的 `Polyglot/English/Writing/002-Daily.md`，不再读取本地 Markdown。

复制 `.env.example` 为 `.env.local` 并填写 `GITHUB_TOKEN`（已有配置无需覆盖）。Token 仅需目标仓库的 Contents 只读权限。部署到 Vercel 时，在 Sonnet 项目的环境变量中配置同名变量。

`lib/notes.ts` 使用 `server-only` 隔离凭证，固定允许读取的文件路径，设置 10 秒请求超时。`next: { revalidate: 60 }` 启用 Next.js Data Cache，页面也可由 Next.js 静态生成并增量更新。同一缓存有效期内复用 GitHub 响应。构建首次生成页面时需要有效 Token 和 GitHub 网络访问。

页面恢复到前台、从浏览器往返缓存恢复或重新联网时，通过 `router.refresh()` 请求服务端页面，保留滚动位置和主题状态。60 秒内重复恢复不会刷新；隐藏或离线时不发起刷新，没有定时轮询和手动更新入口。

缓存采用 stale-while-revalidate：过期后的首次请求可能仍返回旧内容并在后台更新，后续请求使用更新后的缓存，因此 60 秒不是内容可见性的硬性上限。自动刷新不主动清除缓存，持续停留前台也不会自动轮询。GitHub 暂时不可用时，后台重新验证失败可继续保留上次成功的缓存。失败时显示通用提示和重试按钮，不将上游错误详情显示给读者。

`components/markdown.tsx` 负责渲染，与数据源解耦。

支持标准 Markdown 标题、列表、引用、链接、代码和文档中的 `[!NOTE]` 提示。原始 HTML 不渲染，暂不支持表格、双链、嵌入附件和语法高亮。

共享颜色定义在 `packages/tailwind-config/shared-styles.css`。默认跟随系统明暗偏好；在 `html` 上设置 `data-theme="light"` 或 `data-theme="dark"` 可显式指定主题。
