import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolActions from "@/components/shared/tool-actions";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import { Sun } from "lucide-react";
import ShowWeather from "./weather";
import { weatherContent } from "@/lib/tool-content-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "هواشناسی",
};

export default function WeatherPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
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
              title: "هواشناسی",
            },
          ]}
        />

        <ToolActions
          toolName="هواشناسی"
          toolSlug="weather"
          toolIcon="Sun"
        />
      </div>

      {/* Tool Title */}
      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={Sun}
          title="هواشناسی"
          description="مشاهده وضعیت آب‌وهوا و پیش‌بینی روزهای آینده"
          variant="violet"
        />
      </div>

      {/* Main Description */}
      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید وضعیت فعلی آب‌وهوا، دمای هوا،
          کمینه و بیشینه دما، رطوبت، سرعت باد و احتمال بارش را مشاهده کنید
          و پیش‌بینی آب‌وهوا در روزهای آینده را نیز بررسی کنید.
        </p>
      </div>

      {/* Weather */}
      <div className="mt-3 w-full">
        <ShowWeather />
      </div>

      {/* Description */}
      <div className="mt-3 w-full">
        <ToolContent
          title={weatherContent.title}
          icon={weatherContent.icon}
          items={weatherContent.items}
        />
      </div>
    </div>
  );
}