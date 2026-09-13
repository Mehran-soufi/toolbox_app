import { Metadata } from "next";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";

import FavoriteTools from "./favorite-tools";

export const metadata: Metadata = {
  title: "محبوب‌ها",
};

export default function FavoritesPage() {
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
            title: "محبوب‌ها",
          },
        ]}
      />

      {/* Description */}
      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          در این بخش می‌توانید ابزارهایی را که به لیست محبوب‌های خود
          اضافه کرده‌اید مشاهده و مدیریت کنید.
        </p>
      </div>

      {/* Favorite Tools */}
      <FavoriteTools />
    </div>
  );
}
