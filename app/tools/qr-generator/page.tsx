import type { Metadata } from "next";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { QRCodeGenerator } from "@/lib/tool-content-data";
import { QrCode } from "lucide-react";
import QRGenerator from "./qr-generator";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تولید QR Code",
};

export default function QrGeneratorrPage() {
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
              title: "تولید QR Code",
            },
          ]}
        />

        <ToolActions
          toolName="تولید QR Code"
          toolSlug="qr-generator"
          toolIcon="QrCode"
        />
      </div>

      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={QrCode}
          title="تولید QR Code"
          description="ساخت سریع و آسان کد QR برای متن و لینک"
          variant="violet"
        />
      </div>

      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید به‌سادگی برای متن یا
          لینک موردنظر خود یک QR Code ایجاد کرده و آن را به‌صورت
          تصویر دانلود کنید.
        </p>
      </div>

      <div className="mt-3 w-full">
        <QRGenerator />
      </div>

      <div className="mt-3 w-full">
        <ToolContent
          title={QRCodeGenerator.title}
          icon={QRCodeGenerator.icon}
          items={QRCodeGenerator.items}
        />
      </div>
    </div>
  );
}
