"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Flag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useToolHistory } from "@/hooks/useToolHistory";

interface Lap {
  id: number;
  time: number;
  display: string;
}

export default function StopWatch() {

      useToolHistory({
        toolName: "کرونومتر",
        toolSlug: "stopWatch",
        toolIcon: "Timer",
      });

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    toast.info("کرونومتر بازنشانی شد");
  };

  const handleLap = () => {
    if (time > 0) {
      const newLap: Lap = {
        id: laps.length + 1,
        time: time,
        display: formatTime(time),
      };
      setLaps([newLap, ...laps]);
    }
  };

  const clearLaps = () => {
    setLaps([]);
  };
  return (
    <div>
      {/* Main Display Card */}
      <Card
        className="p-8 my-3 flex flex-col items-center justify-center 
       border 
            border-zinc-200 
            dark:border-zinc-800 
            bg-white/60 
            dark:bg-zinc-900/50
            shadow-[0_0_35px_rgba(173,70,255,.12)] 
            backdrop-blur-xl 
            rounded-xl"
      >
        <div className="xl:text-6xl md:text-5xl text-4xl font-mono font-bold tracking-tighter mb-8 tabular-nums">
          {formatTime(time)}
        </div>

        <div className="w-full flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="xl:h-14 md:h-12  sm:h-11 h-10  xl:w-14 md:w-12  sm:w-11 w-10  rounded-full"
            onClick={handleReset}
            disabled={time === 0 && !isRunning}
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            size="icon"
            className={`xl:h-14 md:h-12  sm:h-11 h-10  xl:w-14 md:w-12  sm:w-11 w-10  rounded-full transition-all duration-300 ${
              isRunning
                ? "bg-violet-500 hover:bg-violet-600"
                : "bg-purple-500/60 hover:bg-purple-500/70"
            }`}
            onClick={handleStartPause}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 fill-current" />
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="xl:h-14 md:h-12  sm:h-11 h-10  xl:w-14 md:w-12  sm:w-11 w-10 rounded-full"
            onClick={handleLap}
            disabled={!isRunning}
          >
            <Flag className="w-5 h-5" />
          </Button>
        </div>
      </Card>

      {/* Laps Section */}
      {laps.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between px-2">
            <h2 className="font-semibold lg:text-lg text-sm sm:text-base">
              زمان‌های ثبت شده ({laps.length})
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={clearLaps}
            >
              <Trash2 className="w-4 h-4 ml-2" />
              پاکسازی
            </Button>
          </div>

          <div className="space-y-2 max-h-75 overflow-y-auto pr-2 custom-scrollbar">
            {laps.map((lap) => (
              <div
                key={lap.id}
                className="flex items-center justify-between p-4 rounded-xl bg-card border shadow-sm animate-in zoom-in-95"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="font-mono">
                    #{lap.id.toString().padStart(2, "0")}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    زمان ثبت شده
                  </span>
                </div>
                <span className="font-mono font-medium text-lg tabular-nums">
                  {lap.display}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
