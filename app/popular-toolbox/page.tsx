import { Toolbox } from "lucide-react";
import PopularPage from "./popular";

export default function PopularToolboxPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-3 pb-12">
      {/* Page Header */}
      <section className="mb-8">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border
            border-zinc-200/70
            bg-white/60
            p-6 sm:p-8
            shadow-sm
            backdrop-blur-xl
            dark:border-zinc-800
            dark:bg-zinc-900/50
          "
        >
          {/* Background Glow */}
          <div
            className="
              pointer-events-none
              absolute -right-20 -top-20
              size-48
              rounded-full
              bg-violet-500/10
              blur-3xl
            "
          />

          <div className="relative flex items-center gap-4">
            <div
              className="
                flex size-14 shrink-0
                items-center justify-center
                rounded-2xl
                bg-violet-500/10
                text-violet-500
              "
            >
              <Toolbox className="size-7" />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-zinc-900
                  dark:text-zinc-100
                  sm:text-3xl
                "
              >
                ابزارهای محبوب
              </h1>

              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-zinc-500
                  dark:text-zinc-400
                  sm:text-sm
                "
              >
                مجموعه‌ای از ابزارهای کاربردی و محبوب جعبه ابزار{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Popular ToolBox */}
      <PopularPage />
    </main>
  );
}
