"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { tools } from "@/lib/tools";

function MainTools() {
  const displayedTools = tools.slice(0, 10);

  return (
    <section
      className="
      rounded-3xl
      border
      border-zinc-200/70
      dark:border-zinc-800
      bg-white/60
      dark:bg-zinc-900/50
      backdrop-blur-xl
      shadow-[0_0_35px_rgba(173,70,255,.12)]
      p-4
    "
    >
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          scrollbar-none
          xl:overflow-visible
          xl:flex-wrap
          xl:justify-center
        "
      >
        {displayedTools.map((tool) => {
          const Icon = tool.icon;

          return (
            <Link
              key={tool.link}
              href={tool.link}
              className="
                group
                shrink-0
                w-24
                flex
                flex-col
                items-center
                gap-3
                rounded-2xl
                border
                border-zinc-200
                dark:border-zinc-700
                bg-white/60
                dark:bg-zinc-800/50
                py-3
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-purple-500/60
                hover:shadow-xl
                hover:shadow-purple-500/20
              "
            >
              <div
                className={`
                w-12
                h-12
                rounded-2xl

                flex
                items-center
                justify-center

                bg-zinc-100
                dark:bg-zinc-900

                ${tool.color}
              `}
              >
                <Icon size={22} />
              </div>

              <span className="text-sm font-medium">{tool.name}</span>
            </Link>
          );
        })}

        <Link
          href="/tools"
          className="
            group

            shrink-0
            w-24

            flex
            flex-col
            items-center
            gap-3

            rounded-2xl

            border-2
            border-dashed
            border-purple-500/40

            bg-purple-500/5

            py-3

            transition-all
            duration-300

            hover:bg-purple-500/10
            hover:border-purple-500
            hover:-translate-y-1
          "
        >
          <div
            className="
              w-12
              h-12

              rounded-2xl

              flex
              items-center
              justify-center

              bg-purple-500/10
              text-purple-500

              group-hover:scale-110
              transition-transform
            "
          >
            <ChevronLeft size={22} />
          </div>

          <span className="text-sm font-medium text-purple-500">بیشتر</span>
        </Link>
      </div>
    </section>
  );
}

export default MainTools;
