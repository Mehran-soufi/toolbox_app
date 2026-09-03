"use client";

import { useEffect, useRef } from "react";
import { 
  addToolHistoryItem, 
  TOOL_ICONS, 
  TOOL_SLUGS,
  type ToolAction 
} from "@/lib/tool-history";

interface UseToolHistoryProps {
  toolName: string;
  toolSlug?: string;
  toolIcon?: string;
  autoLogView?: boolean;
}

export function useToolHistory({
  toolName,
  toolSlug,
  toolIcon,
  autoLogView = true,
}: UseToolHistoryProps) {
  const isViewLogged = useRef(false);

  const getToolSlug = (): string => {
    return toolSlug || TOOL_SLUGS[toolName] || toolName.toLowerCase().replace(/\s/g, "-");
  };

  const getToolIcon = (): string => {
    return toolIcon || TOOL_ICONS[toolName] || "Tool";
  };

  useEffect(() => {
    if (autoLogView && !isViewLogged.current) {
      const slug = getToolSlug();
      const icon = getToolIcon();
      
      addToolHistoryItem(toolName, slug, icon, "view");
      
      isViewLogged.current = true;
    }
  }, [toolName, autoLogView]);

  const logAction = (
    action: ToolAction = "use",
    details?: Record<string, any>
  ) => {
    const slug = getToolSlug();
    const icon = getToolIcon();
    
    addToolHistoryItem(toolName, slug, icon, action, details);
  };

  const logCalculate = (input: any, output: any) => {
    logAction("calculate", { input, output });
  };

  const logTranslate = (input: string, output: string, targetLang?: string) => {
    logAction("translate", {
      input: input.length > 50 ? input.slice(0, 50) + "..." : input,
      output: output.length > 50 ? output.slice(0, 50) + "..." : output,
      targetLang,
    });
  };

  // تابع جدید برای دریافت/بروزرسانی قیمت‌ها
  const logFetch = (input: any, output: any) => {
    logAction("fetch", { input, output });
  };

  const logUse = (details?: Record<string, any>) => {
    logAction("use", details);
  };

  return {
    logAction,
    logCalculate,
    logTranslate,
    logFetch,  
    logUse,
  };
}