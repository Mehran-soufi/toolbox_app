import PopularToolCard from "@/components/shared/popular-tool-card";
import { popularTools } from "@/lib/popular-tools";
import { Sparkles } from "lucide-react";

export default function PopularPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
          <Sparkles className="size-5" />
        </div>

        <div>
          <h1 className="text-xl font-bold">ابزارهای محبوب</h1>

          <p className="mt-1 text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            ابزارهایی که برای استفاده روزمره کاربرد بیشتری دارند
          </p>
        </div>
      </div>

      {/* Tools */}
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-border/50
          bg-background
          p-3
          sm:p-5
        "
      >
        {/* Glow Background */}
        <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />

        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />

        <div
          className="
            relative
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {popularTools.map((tool) => (
            <PopularToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </section>
    </>
  );
}
