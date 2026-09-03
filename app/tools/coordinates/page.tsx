import { Metadata } from "next";
import { MapPin } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import Coordinates from "./coordinates";
import { CoordinatesContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "مختصات جغرافیایی",
  description:
    "تبدیل مختصات جغرافیایی بین فرمت اعشاری و درجه، دقیقه و ثانیه به‌صورت آنلاین",
};

export default function CoordinatesPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "مختصات جغرافیایی" },
          ]}
        />

        <ToolActions
          toolName="مختصات جغرافیایی"
          toolSlug="coordinates"
          toolIcon="MapPin"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={MapPin}
          title="مختصات جغرافیایی"
          description="تبدیل مختصات بین فرمت اعشاری و DMS"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید مختصات جغرافیایی را بین فرمت اعشاری
          و درجه، دقیقه و ثانیه تبدیل کنید و مختصات مناسب برای استفاده در
          نقشه‌ها را دریافت کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <Coordinates />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={CoordinatesContent.title}
          icon={CoordinatesContent.icon}
          items={CoordinatesContent.items}
        />
      </div>
    </div>
  );
}
