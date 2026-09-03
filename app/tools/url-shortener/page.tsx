import { Metadata } from "next";
import { Link2 } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import UrlShortener from "./url-shortener";
import { UrlShortenerContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "کوتاه کننده لینک",
  description:
    "کوتاه کردن لینک‌های طولانی به‌صورت سریع و آنلاین",
};

export default function UrlShortenerPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "کوتاه کننده لینک" },
          ]}
        />

        <ToolActions
          toolName="کوتاه کننده لینک"
          toolSlug="url-shortener"
          toolIcon="Link2"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Link2}
          title="کوتاه کننده لینک"
          description="تبدیل سریع لینک‌های طولانی به لینک کوتاه"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید لینک‌های
          طولانی را به لینک کوتاه تبدیل کنید و نتیجه را
          به‌سادگی کپی یا باز کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <UrlShortener />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={UrlShortenerContent.title}
          icon={UrlShortenerContent.icon}
          items={UrlShortenerContent.items}
        />
      </div>
    </div>
  );
}