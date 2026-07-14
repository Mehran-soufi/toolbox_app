import Link from "next/link";
import { ChevronLeft, Sparkles } from "lucide-react";

import { popularTools } from "@/lib/popular-tools";
import PopularToolCard from "./popular-tool-card";

function PopularToolsSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/50 bg-background py-6">
      {/* Glow Background */}
      <div className="pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/20" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />

      <div className="relative px-2 md:px-6">
        {/* Header */}
        <div className="lg:mb-6 mb-4 flex items-center justify-between">
          <div className="max-w-2/3 flex items-center gap-3">
            <div
              className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              bg-purple-500/10
              text-purple-600
              dark:bg-purple-500/20
              dark:text-purple-400
            "
            >
              <Sparkles size={18} />
            </div>

            <div>
              <h2 className="md:text-lg font-bold">ابزارهای محبوب</h2>

              <p className="mt-0.5 md:text-sm text-xs text-muted-foreground">
                ابزارهایی که بیشترین استفاده را داشته‌اند.
              </p>
            </div>
          </div>

          <Link
            href="/popular-toolbox"
            className="
              group
              flex
              items-center
              gap-1
              rounded-full
              border
              border-border/70
              lg:px-4
              px-2
              py-2
              md:text-sm
              text-xs
              transition-all
              hover:bg-accent
            "
          >
            مشاهده همه
            <ChevronLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1 hidden md:flex"
            />
          </Link>
        </div>

        {/* Cards */}

        <div
          className="
            grid
            gap-5

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {popularTools.map((tool) => (
            <PopularToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularToolsSection;
