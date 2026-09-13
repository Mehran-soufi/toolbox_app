import { Metadata } from "next";
import { Binary } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import BinaryConverter from "./binary-converter";
import { BinaryConverterContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "تبدیل دودویی",
  description:
    "تبدیل عدد بین مبناهای دودویی، ده‌دهی، هگزادسیمال و اکتال به‌صورت سریع و آنلاین",
};

export default function BinaryConverterPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb + Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <AppBreadcrumb
          items={[
            { title: "خانه", href: "/" },
            { title: "ابزارها", href: "/tools" },
            { title: "تبدیل دودویی" },
          ]}
        />

        <ToolActions
          toolName="تبدیل دودویی"
          toolSlug="binary-converter"
          toolIcon="Binary"
        />
      </div>

      {/* Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Binary}
          title="تبدیل دودویی"
          description="تبدیل سریع اعداد بین مبناهای مختلف"
          variant="violet"
        />
      </div>

      {/* Description */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید اعداد را بین مبناهای دودویی،
          ده‌دهی، هگزادسیمال و اکتال به‌صورت سریع و آنلاین تبدیل کنید.
        </p>
      </div>

      {/* Tool */}
      <div className="w-full mt-3">
        <BinaryConverter />
      </div>

      {/* Content */}
      <div className="w-full mt-3">
        <ToolContent
          title={BinaryConverterContent.title}
          icon={BinaryConverterContent.icon}
          items={BinaryConverterContent.items}
        />
      </div>
    </div>
  );
}