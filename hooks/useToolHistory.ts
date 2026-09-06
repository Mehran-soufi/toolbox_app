"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  addToolHistoryItem,
  TOOL_ICONS,
  TOOL_SLUGS,
  type ToolAction,
} from "@/lib/tool-history";

interface UseToolHistoryProps {
  toolName: string;
  toolSlug?: string;
  toolIcon?: string;
  autoLogView?: boolean;
}

type HistoryDetails = Record<string, unknown>;

export function useToolHistory({
  toolName,
  toolSlug,
  toolIcon,
  autoLogView = true,
}: UseToolHistoryProps) {
  const isViewLogged = useRef(false);

  const getToolSlug = useCallback((): string => {
    return (
      toolSlug ||
      TOOL_SLUGS[toolName] ||
      toolName.toLowerCase().replace(/\s/g, "-")
    );
  }, [toolName, toolSlug]);

  const getToolIcon = useCallback((): string => {
    return toolIcon || TOOL_ICONS[toolName] || "Tool";
  }, [toolName, toolIcon]);

  useEffect(() => {
    if (autoLogView && !isViewLogged.current) {
      const slug = getToolSlug();
      const icon = getToolIcon();

      addToolHistoryItem(toolName, slug, icon, "view");

      isViewLogged.current = true;
    }
  }, [autoLogView, getToolIcon, getToolSlug, toolName]);

  const logAction = useCallback(
    (
      action: ToolAction = "use",
      details?: HistoryDetails,
    ) => {
      const slug = getToolSlug();
      const icon = getToolIcon();

      addToolHistoryItem(toolName, slug, icon, action, details);
    },
    [getToolIcon, getToolSlug, toolName],
  );

  const logCalculate = useCallback(
    (input: unknown, output: unknown) => {
      logAction("calculate", { input, output });
    },
    [logAction],
  );

  const logTranslate = useCallback(
    (input: string, output: string, targetLang?: string) => {
      logAction("translate", {
        input: input.length > 50 ? `${input.slice(0, 50)}...` : input,
        output: output.length > 50 ? `${output.slice(0, 50)}...` : output,
        targetLang,
      });
    },
    [logAction],
  );

  const logFetch = useCallback(
    (input: unknown, output: unknown) => {
      logAction("fetch", { input, output });
    },
    [logAction],
  );

  const logUse = useCallback(
    (details?: HistoryDetails) => {
      logAction("use", details);
    },
    [logAction],
  );

  return {
    logAction,
    logCalculate,
    logTranslate,
    logFetch,
    logUse,
  };
}
