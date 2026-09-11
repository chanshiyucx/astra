# Astra

使用 Turborepo 官方 `with-tailwind` 模板初始化的 pnpm monorepo。

## 环境与启动

要求 Node.js 24+，pnpm 版本由根目录 `package.json` 的 `packageManager` 固定。

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

- `apps/sonnet`：主应用，http://localhost:3001
- `packages/ui`：共享 React 组件与独立编译的 Tailwind 样式
- `packages/tailwind-config`：共享主题与 PostCSS 配置
- `packages/eslint-config`：共享 ESLint 配置
- `packages/typescript-config`：共享 TypeScript 配置

包名统一使用 `@astra/*`；目录名保持不变。根目录是私有 workspace，名称保留 `astra`。

## 常用命令

```sh
corepack pnpm lint
corepack pnpm check-types
corepack pnpm build
corepack pnpm --filter @astra/sonnet start
corepack pnpm format
```

请依次执行类型检查和构建，两者均会生成 Next.js 路由类型，不应同时写入 `.next`。
保留 TypeScript 严格模式和生产构建类型检查。没有配置测试框架、测试脚本或测试任务。

## 初始化来源

实际使用官方脚手架生成项目，再调整项目名、Node 版本提示和生产服务端口，移除模板跳过构建类型检查的配置。

```sh
pnpm dlx create-turbo@latest . --example with-tailwind --package-manager pnpm
```

官方参考：

- [Turborepo 初始化命令](https://turborepo.dev/docs/reference/create-turbo)
- [Turborepo with-tailwind 模板](https://github.com/vercel/turborepo/tree/main/examples/with-tailwind)
- [Next.js 安装指南](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS 的 Next.js 集成](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
- [pnpm 安装说明](https://pnpm.io/installation)

---

## 原始官方模板说明

# Turborepo Tailwind CSS starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-tailwind
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `@astra/sonnet`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `@astra/ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) used by the `sonnet` application
- `@astra/tailwind-config`: shared Tailwind CSS theme and PostCSS configuration
- `@astra/eslint-config`: `eslint` flat configurations (includes `@next/eslint-plugin-next` and `eslint-config-prettier`)
- `@astra/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.ts`. This was chosen for several reasons:

- Make sharing one theme from `packages/tailwind-config/shared-styles.css` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for its classes via `@import "tailwindcss" prefix(ui);` in [packages/ui/src/styles.css](packages/ui/src/styles.css).
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. Tailwind CSS v4 automatically detects class names in your source files, but it does not scan other packages in `node_modules`. If you use this option, add [`@source` directives](https://tailwindcss.com/docs/functions-and-directives#source-directive) to the CSS entry point in your apps so Tailwind can find the class names used in the `ui` package:

```css
@import "tailwindcss";
@import "@astra/tailwind-config";

@source "../../../packages/ui/src";
```

If you choose this strategy, you can remove the `tailwindcss` dependency and the `build:styles` script from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
