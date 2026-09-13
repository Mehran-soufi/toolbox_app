import { Metadata } from "next";
import { CaseUpper } from "lucide-react";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolActions from "@/components/shared/tool-actions";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import TextCase from "./text-case";
import { TextCaseContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "تغییر حروف و پردازش متن",
};

export default function TextCasePage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            {
              title: "خانه",
              href: "/",
            },
            {
              title: "ابزارها",
              href: "/tools",
            },
            {
              title: "تغییر حروف و پردازش متن",
            },
          ]}
        />

        <ToolActions
          toolName="تغییر حروف و پردازش متن"
          toolSlug="text-case"
          toolIcon="CaseUpper"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={CaseUpper}
          title="تغییر حروف و پردازش متن"
          description="اصلاح و تغییر متن فارسی و انگلیسی به‌صورت سریع و آنلاین"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید متن‌های فارسی و انگلیسی را
          یکسان‌سازی، پاک‌سازی و ویرایش کنید. همچنین امکان تغییر حروف
          انگلیسی به بزرگ یا کوچک و اصلاح فاصله‌ها و حروف فارسی نیز وجود دارد.
        </p>
      </div>

      <div className="mt-3 w-full">
        <TextCase />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={TextCaseContent.title}
          icon={TextCaseContent.icon}
          items={TextCaseContent.items}
        />
      </div>
    </div>
  );
}
