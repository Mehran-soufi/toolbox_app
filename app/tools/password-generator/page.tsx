import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import { LockKeyhole } from "lucide-react";
import ToolContent from "@/components/shared/tool-content";
import { passwordGeneratorContent } from "@/lib/tool-content-data";
import PassGenSetting from "./pass-gen-setting";
import { Metadata } from "next";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "رمزساز",
};

export default function PasswordGeneratorPage() {
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
              title: "رمزساز",
            },
          ]}
        />
        <ToolActions
          toolName="رمزساز"
          toolSlug="password-generator"
          toolIcon="LockKeyhole"
        />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}
        <ToolTitle
          icon={LockKeyhole}
          title="رمزساز"
          description="ایجاد رمز های مطمئن و کاربردی"
          variant="rose"
        />
      </div>
      {/* Description */}
      <div className="w-full my-2">
        <p className="text-sm opacity-70">
          از ابزار آنلاین تولید رمز عبور ما استفاده کنید تا فوراً یک رمز عبور
          امن و تصادفی ایجاد کنید.
        </p>
      </div>
      {/* password generatior */}
      <PassGenSetting />
      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={passwordGeneratorContent.title}
          icon={passwordGeneratorContent.icon}
          items={passwordGeneratorContent.items}
        />
      </div>
    </div>
  );
}
