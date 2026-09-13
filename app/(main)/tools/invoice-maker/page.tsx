import { Metadata } from "next";
import { FileText } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import InvoiceMaker from "./invoice-maker";
import { InvoiceMakerContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "فاکتور ساز",
  description:
    "ساخت و چاپ فاکتور حرفه‌ای به‌صورت آنلاین و رایگان",
};

export default function InvoiceMakerPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "فاکتور ساز" },
          ]}
        />

        <ToolActions
          toolName="فاکتور ساز"
          toolSlug="invoice-maker"
          toolIcon="FileText"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={FileText}
          title="فاکتور ساز"
          description="ساخت، ویرایش و چاپ فاکتور به‌صورت آنلاین"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید اطلاعات فروشنده،
          مشتری و کالاها را وارد کرده و یک فاکتور مرتب و
          قابل چاپ ایجاد کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <InvoiceMaker />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={InvoiceMakerContent.title}
          icon={InvoiceMakerContent.icon}
          items={InvoiceMakerContent.items}
        />
      </div>
    </div>
  );
}