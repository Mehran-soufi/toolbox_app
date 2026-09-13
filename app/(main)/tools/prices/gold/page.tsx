import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { PricesGoldContent } from "@/lib/tool-content-data";
import { Coins } from "lucide-react";
import GoldPrices from "./gold-prices";
import ToolActions from "@/components/shared/tool-actions";

export default function PageGoldPrices() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
        <AppBreadcrumb
          items={[
            {
              title: "خانه",
              href: "/",
            },
            {
              title: "ابزار ها",
              href: "/tools",
            },
            {
              title: "قیمت ارز، طلا و کالا",
              href: "/tools/prices",
            },
            {
              title: "طلا و سکه",
            },
          ]}
        />
        <ToolActions
          toolName="طلا و سکه"
          toolSlug="prices/gold"
          toolIcon="Coins"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Coins}
          title="قیمت طلا و سکه"
          description="مشاهده آخرین قیمت طلا، سکه و انس جهانی"
          variant="amber"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm opacity-70">
          در این بخش می‌توانید آخرین قیمت طلا، انواع سکه و انس جهانی طلا را
          مشاهده کنید.
        </p>
      </div>

      <div className="w-full mt-3">
        <GoldPrices />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={PricesGoldContent.title}
          icon={PricesGoldContent.icon}
          items={PricesGoldContent.items}
        />
      </div>
    </div>
  );
}
