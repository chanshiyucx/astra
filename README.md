# Astra

基于 Turborepo 与 pnpm 构建的 Monorepo。

## 目录结构

- `apps/sonnet`：主应用，英语笔记阅读页 (Next.js，运行于 http://localhost:3001)
- `packages/ui`：共享 React 组件库
- `packages/tailwind-config`：共享 Tailwind CSS 与 PostCSS 配置
- `packages/eslint-config`：共享 ESLint 配置
- `packages/typescript-config`：共享 TypeScript 配置

## 快速开始

环境要求：Node.js >= 24，pnpm。

```sh
# 准备环境并安装依赖
nvm use
pnpm install

# 启动开发服务
pnpm dev             # 启动所有应用
pnpm dev:sonnet      # 仅启动 Sonnet
```

## 常用命令

```sh
pnpm check-types     # 类型检查
pnpm build           # 项目构建
pnpm lint            # 代码规范检查
pnpm format          # 代码格式化
```

> **注意**：`check-types` 与 `build` 均会生成 Next.js 路由类型，请依次执行，避免并发写入 `.next` 冲突。
