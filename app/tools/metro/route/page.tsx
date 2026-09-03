import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import { metroContent } from "@/lib/tool-content-data";
import SelectRoute from "./select-route";
import ToolActions from "@/components/shared/tool-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مسیریابی مترو",
};

export default function MetroRoute() {
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
              title: "مترو",
              href: "/tools/metro",
            },
            {
              title: "مسیریابی مترو",
            },
          ]}
        />
        <ToolActions
          toolName="مسیریابی مترو"
          toolSlug="metro/route"
          toolIcon="TramFront"
        />
      </div>

      {/* Routing */}
      <div className="w-full my-2">
        <SelectRoute />
      </div>
      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={metroContent.title}
          icon={metroContent.icon}
          items={metroContent.items}
        />
      </div>
    </div>
  );
}
