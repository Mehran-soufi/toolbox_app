import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { QRCodeGenerator, timerContent } from "@/lib/tool-content-data";
import { QrCode, Timer } from "lucide-react";
import QRGenerator from "./qr-generator";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "تولید QR Code",
};

export default function QrGeneratorrPage() {
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

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={QrCode}
          title="تولید QR Code"
          description="ساخت سریع و آسان کد QR برای متن و لینک"
          variant="violet"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید به‌سادگی برای متن یا لینک موردنظر
          خود یک QR Code ایجاد کرده و آن را به‌صورت تصویر دانلود کنید.
        </p>
      </div>

      {/* QR Generator */}
      <div className="w-full mt-3">
        <QRGenerator />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={QRCodeGenerator.title}
          icon={QRCodeGenerator.icon}
          items={QRCodeGenerator.items}
        />
      </div>
    </div>
  );
}
