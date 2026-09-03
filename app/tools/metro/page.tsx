
import Link from "next/link";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { metroContent } from "@/lib/tool-content-data";
import { Binoculars, Map, TramFront } from "lucide-react";
import { Metadata } from "next";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "مترو",
};

export default function MetroPage() {
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
            },
          ]}
        />
        <ToolActions toolName="مترو" toolSlug="metro" toolIcon="TramFront" />
      </div>

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}
        <ToolTitle
          icon={TramFront}
          title="مترو"
          description="مسیریابی و نقشه مترو"
          variant="rose"
        />
      </div>
      {/* metro items */}
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-2 mt-2">
        <div
          className="col-span-1 h-28 rounded-lg border border-violet-500/20 bg-background
         p-4 shadow-[0_0_30px_rgba(139,92,246,.12)] group"
        >
          <div className="w-full h-full flex items-center justify-center">
            <Link
              href="/tools/metro/map"
              className="w-full h-full cursor-pointer flex items-center justify-center gap-x-2
              transition-all duration-600 group-hover:scale-105"
            >
              <Map size={18} />
              نقشه مترو
            </Link>
          </div>
        </div>
        <div
          className="col-span-1 h-28 rounded-lg border border-violet-500/20 bg-background
         p-4 shadow-[0_0_30px_rgba(139,92,246,.12)] group"
        >
          <div className="w-full h-full flex items-center justify-center">
            <Link
              href="/tools/metro/route"
              className="w-full h-full cursor-pointer flex items-center justify-center gap-x-2
              transition-all duration-600 group-hover:scale-105"
            >
              <Binoculars size={18} />
              مسیریابی مترو
            </Link>
          </div>
        </div>
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
