"use client";

import ToolContent from "@/components/shared/tool-content";
import { calculatorContent } from "@/lib/tool-content-data";
import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import ToolTitle from "@/components/shared/tool-title";
import { Calculator } from "lucide-react";
import RelatedTools from "./related-tools";
import Tips from "./tips";
import Shortcut from "./shortcut";
import About from "./about";
import History from "./history";
import Calc from "./calc";
import { useEffect, useState } from "react";
import { HistoryItem } from "@/lib/calculator-history";

function CalculatorPage() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [calculated, setCalculated] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculator-history");

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history whenever changes
  useEffect(() => {
    localStorage.setItem("calculator-history", JSON.stringify(history));
  }, [history]);

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
            title: "ابزارها",
            href: "/tools",
          },
          {
            title: "ماشین حساب",
          },
        ]}
      />

      <div className="w-full flex flex-col gap-y-2.5">
        {/* Tool Title */}

        <ToolTitle
          icon={Calculator}
          title="ماشین حساب"
          description="محاسبات دقیق و پیشرفته برای نیازهای شما"
          variant="emerald"
        />

        <div
          className="
          w-full 
          xl:h-150 
          grid 
          xl:grid-cols-4 
          md:grid-cols-3 
          grid-cols-1 
          xl:grid-rows-5 
          lg:gap-2 
          gap-1
        "
        >
          {/* About */}

          <div
            className="
            p-2 
            md:col-start-1 
            md:col-end-2 
            md:row-start-1 
            md:row-end-4 
            col-span-1 
            row-start-2
            border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl
            "
          >
            <About />
          </div>

          {/* Related tools */}

          <div
            className="
            p-2 
            md:col-start-1 
            md:col-end-2 
            md:row-start-4 
            md:row-end-6
            border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl
            "
          >
            <RelatedTools />
          </div>

          {/* Shortcut */}

          <div
            className="
            p-2 
            md:col-start-4 
            md:col-end-6 
            md:row-start-1 
            md:row-end-3
            border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl
            "
          >
            <Shortcut />
          </div>

          {/* History */}

          <div
            className="
            p-2 
            md:col-start-4 
            md:col-end-6 
            md:row-start-3 
            md:row-end-6 
            col-span-1 
            row-start-3
            border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl
            rounded-xl
            "
          >
            <History
              history={history}
              onSelect={(item) => {
                setExpression(item.expression);

                setResult(item.result);

                setCalculated(true);
              }}
              onClear={() => {
                setHistory([]);

                localStorage.removeItem("calculator-history");
              }}
            />
          </div>

          {/* Tips */}

          <div
            className="
            p-2 
            md:col-start-2 
            md:col-end-4 
            md:row-start-5 
            md:row-end-6
            border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl
            rounded-xl
            "
          >
            <Tips />
          </div>

          {/* Calculator */}

          <div
            className="
            min-h-100 
            xl:p-2 
            lg:p-1 
            sm:p-1 
            md:col-start-2 
            md:col-end-4 
            md:row-start-1 
            md:row-end-5 
            col-span-1 
            row-start-1
            "
          >
            <div
              className="
              w-full 
              h-full 
              xl:p-8 
              lg:p-4 
              flex 
              items-center 
              justify-center
            "
            >
              <div
                className="
                w-full 
                h-full 
                border 
                border-zinc-200 
                dark:border-zinc-800
                bg-white/60 
                dark:bg-zinc-900/50
                shadow-[0_0_35px_rgba(173,70,255,.12)] 
                backdrop-blur-xl
                rounded-xl
                "
              >
                <Calc
                  expression={expression}
                  setExpression={setExpression}
                  result={result}
                  setResult={setResult}
                  calculated={calculated}
                  setCalculated={setCalculated}
                  setHistory={setHistory}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="w-full mt-3"></div>
        <ToolContent
          title={calculatorContent.title}
          icon={calculatorContent.icon}
          items={calculatorContent.items}
        />
      </div>
    </div>
  );
}

export default CalculatorPage;
