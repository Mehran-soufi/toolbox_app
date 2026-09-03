import { Metadata } from "next";
import { StickyNote } from "lucide-react";

import NoteTool from "./note-tool";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import ToolContent from "@/components/shared/tool-content";
import ToolActions from "@/components/shared/tool-actions";

import { NoteToolContent } from "@/lib/tool-content-data";

export const metadata: Metadata = {
  title: "یادداشت",
};

export default function NotesPage() {
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
              title: "یادداشت",
            },
          ]}
        />

        <ToolActions
          toolName="یادداشت"
          toolSlug="notes"
          toolIcon="StickyNote"
        />
      </div>

      {/* Tool Title */}
      <div className="flex w-full flex-col gap-y-2.5">
        <ToolTitle
          icon={StickyNote}
          title="یادداشت"
          description="یادداشت‌های خود را سریع بنویسید و در مرورگر ذخیره کنید"
          variant="violet"
        />
      </div>

      {/* Description */}
      <div className="my-2 w-full">
        <p className="text-sm leading-7 opacity-70">
          با استفاده از این ابزار می‌توانید یادداشت‌های خود را ایجاد، ویرایش و
          ذخیره کنید. یادداشت‌ها به‌صورت خودکار در مرورگر شما ذخیره می‌شوند و
          حتی پس از بستن یا تازه‌سازی صفحه نیز باقی خواهند ماند.
        </p>
      </div>

      {/* Notes */}
      <div className="mt-3 w-full">
        <NoteTool />
      </div>

      {/* Content */}
      <div className="mt-3 w-full">
        <ToolContent
          title={NoteToolContent.title}
          icon={NoteToolContent.icon}
          items={NoteToolContent.items}
        />
      </div>
    </div>
  );
}