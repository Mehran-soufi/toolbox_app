import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolHistory from "./tool-history";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تاریخچه",
};

export default function HistoryPage() {
  return (
    <div className="my-3 flex flex-col gap-y-3">
      {/* Breadcrumb */}
      <AppBreadcrumb
        items={[
          {
            title: "خانه",
            href: "/",
          },
          {
            title: "تاریخچه",
          },
        ]}
      />
      <div className="w-full my-2">
        <p className="text-sm leading-7 opacity-70">
          در این بخش شما میتوانید تاریخچه استفاده از ابزار های استفاده شده را
          مشاهده کنید.
        </p>
      </div>
      <ToolHistory />
    </div>
  );
}

