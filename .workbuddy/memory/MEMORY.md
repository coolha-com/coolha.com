# coolha.com 项目记忆

## 项目定位
Coolha Limited（酷哈有限公司），香港注册（2025-08-26），Web3 + AI 的 Web4 项目。
面向 Agent 数字生命——不止卖给人类，还包括上亿个 Agent。
技术栈关键词：EVM 区块链、ERC-8004（Agent 链上身份）、x402（可编程支付）、稳定币、RWA 代币化。

## 技术架构
- Next.js 16.2.6 + Turbopack，React 19，Tailwind v4
- next-intl v4，三语言：`en`（默认）/ `zh-Hans` / `zh-Hant`，路径形如 `/zh-Hans/ai`
- `src/proxy.ts` 是 i18n 中间件（next-intl createMiddleware），`localePrefix: 'always'`
- 品牌主色 `#C0E218`（黄绿），站点强制暗色主题（`<html className="dark">`）

## 关键约定
- **i18n 键必须三语同步**：改任何 `src/i18n/*.json` 后用脚本校验 key 数量一致
- **metadata 必须用 `params.locale`**，不要用 `getLocale()`——根因是后者在根 layout 里
  拿不到正确的语言，导致全站 title/canonical 指向英文/首页（已于 2026-11-02 修复）
- **canonical/hreflang 统一走 `src/lib/seo.ts` 的 `buildAlternates(path, locale)`**，
  不要在各页面手写 URL
- 页面级 metadata 放各页面的 `layout.tsx`（ai/rwa/company），
  `(www)/layout.tsx` 只负责 Header/Footer 布局，不要放 metadata
- 首页是 client 组件时，metadata 需通过 server component 包装（见 `_layout/Home.tsx` 模式）

## 验证方式
- 改完跑 `npx next build`（应生成 23 个静态页）+ `npx tsc --noEmit`
- 视觉改动用 Playwright 截图逐页核对；Chromium 已在
  `~/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe`，
  需在脚本里指定 `executablePath`（当前 playwright 版本与已装浏览器版本不匹配，不会自动下载）
- 生产验证：`npx next start -p <port>`，注意端口可能被残留进程占用
