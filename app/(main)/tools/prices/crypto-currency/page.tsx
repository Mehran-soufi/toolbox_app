import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolContent from "@/components/shared/tool-content";
import ToolTitle from "@/components/shared/tool-title";
import { PricesCryptoCurrencyContent } from "@/lib/tool-content-data";
import { Bitcoin } from "lucide-react";
import CryptocurrencyPrices from "./cryptocurrency-prices";
import ToolActions from "@/components/shared/tool-actions";

export default function PageCriptoCurrencyPrices() {
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
              title: "ارز دیجیتال",
            },
          ]}
        />
        <ToolActions
          toolName="ارز دیجیتال"
          toolSlug="prices/cryoto-currency"
          toolIcon="Bitcoin"
        />
      </div>

      {/* Tool Title */}
      <div className="w-full flex flex-col gap-y-2.5">
        <ToolTitle
          icon={Bitcoin}
          title="قیمت ارز دیجیتال"
          description="مشاهده آخرین قیمت ارزهای دیجیتال"
          variant="violet"
        />
      </div>

      {/* Main */}
      <div className="w-full my-2">
        <p className="text-sm opacity-70">
          در این بخش می‌توانید آخرین قیمت ارزهای دیجیتال مانند بیت‌کوین، اتریوم،
          تتر، سولانا و سایر رمزارزهای پرکاربرد را مشاهده کنید.
        </p>
      </div>

      {/* Cryptocurrency Prices */}
      <div className="w-full mt-3">
        {/* CryptocurrencyPrices */}
        <CryptocurrencyPrices />
      </div>

      {/* Description */}
      <div className="w-full mt-3">
        <ToolContent
          title={PricesCryptoCurrencyContent.title}
          icon={PricesCryptoCurrencyContent.icon}
          items={PricesCryptoCurrencyContent.items}
        />
      </div>
    </div>
  );
}
