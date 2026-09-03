import { Metadata } from "next";

import { Globe2 } from "lucide-react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";

import CommodityPrices from "./commodity-prices";

import { CommodityPricesContent } from "@/lib/tool-content-data";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "قیمت کالاهای جهانی",
};

export default function CommodityPricesPage() {
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
              title: "قیمت ارز، طلا و کالا",
              href: "/tools/prices",
            },
            {
              title: "کالاهای جهانی",
            },
          ]}
        />
        <ToolActions
          toolName="کالاهای جهانی"
          toolSlug="prices/commodity"
          toolIcon="Globe2"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Globe2}
          title="قیمت کالاهای جهانی"
          description="مشاهده آخرین قیمت فلزات، انرژی و سایر کالاهای جهانی"
          variant="violet"
        />
      </div>

      {/* Main Description */}
      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          در این بخش می‌توانید آخرین قیمت کالاهای مهم بازارهای جهانی مانند طلا،
          نقره، مس، آلومینیوم، نفت و گاز طبیعی را مشاهده کنید.
        </p>
      </div>

      {/* Commodity Prices */}
      <div className="mt-3 w-full">
        <CommodityPrices />
      </div>

      {/* Description */}
      <div className="mt-3 w-full">
        <ToolContent
          title={CommodityPricesContent.title}
          icon={CommodityPricesContent.icon}
          items={CommodityPricesContent.items}
        />
      </div>
    </div>
  );
}
