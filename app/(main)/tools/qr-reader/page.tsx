import { Metadata } from "next";

import QRReader from "./qr-reader";

import ToolTitle from "@/components/shared/tool-title";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";

import { QRCodeReader } from "@/lib/tool-content-data";

import { ScanLine } from "lucide-react";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "خواندن QR Code",
};

export default function QRReaderPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
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
              title: "خواندن QR Code",
            },
          ]}
        />

        <ToolActions
          toolName="خواندن QR Code"
          toolSlug="qr-reader"
          toolIcon="ScanLine"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={ScanLine}
          title="خواندن QR Code"
          description="خواندن سریع و آسان اطلاعات موجود در کد QR"
          variant="violet"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید یک QR Code را از روی تصویر بارگذاری
          کرده یا با دوربین دستگاه اسکن کنید و اطلاعات موجود در آن را به‌سادگی
          مشاهده و کپی کنید.
        </p>
      </div>

      {/* QR Reader */}
      <div className="w-full mt-3">
        <QRReader />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={QRCodeReader.title}
          icon={QRCodeReader.icon}
          items={QRCodeReader.items}
        />
      </div>
    </div>
  );
}
