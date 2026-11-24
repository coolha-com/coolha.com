import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 带语言前缀的导航封装：Link 会自动补上当前 locale，
// usePathname 返回不带前缀的路径（如 "/agent"）。
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
