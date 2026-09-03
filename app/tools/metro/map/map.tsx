"use client"

import Image from "next/image";
import metroImg from "@/assets/metro/metro.jpg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MapPage() {
  return (
    <div
      className=" p-2 relative w-full h-full overflow-hidden rounded-xl border border-violet-500/20
      bg-background shadow-[0_0_30px_rgba(139,92,246,.12)] flex items-center justify-center
      "
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Controls */}

            <div
              className="
              absolute
              z-10
              top-3
              right-3
              flex
              flex-col
              gap-2
              "
            >
              <Button size="icon" variant="outline" onClick={() => zoomIn()}>
                <ZoomIn size={18} />
              </Button>

              <Button size="icon" variant="outline" onClick={() => zoomOut()}>
                <ZoomOut size={18} />
              </Button>

              <Button
                size="icon"
                variant="outline"
                onClick={() => resetTransform()}
              >
                <RotateCcw size={18} />
              </Button>
            </div>

            <TransformComponent>
              <div className="relative xl:w-300 xl:h-300 lg:w-200 lg:h-200 sm:w-150 sm:h-150 w-80 h-80">
                <Image
                  src={metroImg}
                  alt="نقشه مترو تهران"
                  fill
                  priority
                  className="absolute
                    max-w-none
                    object-center
                    "
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
