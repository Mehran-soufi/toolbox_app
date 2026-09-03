import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolActions from "@/components/shared/tool-actions";
import ToolContent from "@/components/shared/tool-content";
import { nationalCodeContent } from "@/lib/tool-content-data";
import NationalCode from "./national-code";

export default function NationalCodePage() {
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
              title: "اعتبارسنجی کد ملی",
            },
          ]}
        />

        <ToolActions
          toolName="اعتبارسنجی کد ملی"
          toolSlug="national-code"
          toolIcon="BadgeCheck"
        />
      </div>

      <NationalCode />

      <ToolContent
        title={nationalCodeContent.title}
        icon={nationalCodeContent.icon}
        items={nationalCodeContent.items}
      />
    </div>
  );
}