import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieStore = cookies();
  const locale = (await cookieStore).get("NEXT_LOCALE")?.value || "zh-Hans";

  return {
    locale,
    messages: (await import(`./${locale}.json`)).default,
  };
});
