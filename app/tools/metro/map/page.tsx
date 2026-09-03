import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolActions from "@/components/shared/tool-actions";
import ToolContent from "@/components/shared/tool-content";
import { metroContent } from "@/lib/tool-content-data";
import MapPage from "./map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "نقشه مترو",
};


export default function MetroMap() {
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
              title: "نقشه مترو",
            },
          ]}
        />
        <ToolActions
          toolName="نقشه مترو"
          toolSlug="metro/map"
          toolIcon="TramFront"
        />
      </div>
      {/* Map */}
      <MapPage />

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
