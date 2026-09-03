import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";

import { PricesContent } from "@/lib/tool-content-data";

import { ReceiptCent } from "lucide-react";

import PricesCategories from "./prices-categories";
import ToolActions from "@/components/shared/tool-actions";

export const metadata: Metadata = {
  title: "قیمت ارز، طلا و کالا",
};

export default function PagePrices() {
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
            },
          ]}
        />
        <ToolActions
          toolName="قیمت ارز، طلا و کالا"
          toolSlug="prices"
          toolIcon="ReceiptCent"
        />
      </div>
      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={ReceiptCent}
          title="قیمت ارز، طلا، کالا و ارز دیجیتال"
          description="مشاهده آخرین قیمت ارزها، طلا، سکه، کالاها و ارزهای دیجیتال"
          variant="rose"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          در این بخش می‌توانید آخرین قیمت ارزهای مختلف، طلا، سکه، کالاها و
          ارزهای دیجیتال را مشاهده کنید. برای مشاهده جزئیات و اطلاعات بیشتر،
          دسته موردنظر خود را انتخاب کنید.
        </p>
      </div>

      {/* Price Categories */}
      <div className="w-full mt-3">
        <PricesCategories />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={PricesContent.title}
          icon={PricesContent.icon}
          items={PricesContent.items}
        />
      </div>
    </div>
  );
}
