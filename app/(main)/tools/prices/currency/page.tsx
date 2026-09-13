import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { PricesCurrencyContent } from "@/lib/tool-content-data";
import { Banknote } from "lucide-react";
import CurrencyPrices from "./currency-prices";
import ToolActions from "@/components/shared/tool-actions";

export default function PageCurrencyPrices() {
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
              title: "ارز",
            },
          ]}
        />
        <ToolActions
          toolName="ارز"
          toolSlug="prices/currency"
          toolIcon="Banknote"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Banknote}
          title="قیمت ارز"
          description="مشاهده آخرین قیمت ارزهای مختلف"
          variant="blue"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm opacity-70">
          در این بخش می‌توانید آخرین قیمت ارزهای مختلف مانند دلار، یورو، پوند،
          درهم و سایر ارزهای پرکاربرد را مشاهده کنید.
        </p>
      </div>

      {/* Currency Prices */}
      <div className="w-full mt-3">
        {/* CurrencyPrices */}
        <CurrencyPrices />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={PricesCurrencyContent.title}
          icon={PricesCurrencyContent.icon}
          items={PricesCurrencyContent.items}
        />
      </div>
    </div>
  );
}
