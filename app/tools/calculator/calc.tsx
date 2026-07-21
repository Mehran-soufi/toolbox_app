"use client";

import { useCallback, useEffect } from "react";
import CalculatorDisplay from "./calculator-display";
import CalculatorKeyButton from "./calculator-key";
import { calculatorKeys } from "@/lib/calculator-data";
import { HistoryItem } from "@/lib/calculator-history";

interface CalcProps {
  expression: string;
  result: string;
  calculated: boolean;

  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<string>>;
  setCalculated: React.Dispatch<React.SetStateAction<boolean>>;

  setHistory: React.Dispatch<React.SetStateAction<HistoryItem[]>>;
}

export default function Calc({
  expression,
  result,
  calculated,

  setExpression,
  setResult,
  setCalculated,

  setHistory,
}: CalcProps) {
  const calculate = useCallback(() => {
    if (!expression.trim()) return;

    try {
      const formattedExpression = expression.replace(/(\d+)%/g, "($1/100)");

      const calculatedResult = eval(formattedExpression);

      const resultValue = String(calculatedResult);

      setResult(resultValue);

      setCalculated(true);

      const newItem: HistoryItem = {
        id: Date.now(),
        expression,
        result: resultValue,

        createdAt: new Date().toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) =>
            item.expression !== newItem.expression ||
            item.result !== newItem.result,
        );

        return [newItem, ...filtered].slice(0, 20);
      });
    } catch {
      setResult("Error");
      setCalculated(true);
    }
  }, [expression, setHistory, setResult, setCalculated]);

  const handleClick = useCallback(
    (value: string) => {
      switch (value) {
        case "clear":
          setExpression("");
          setResult("0");
          setCalculated(false);

          break;

        case "backspace":
          setExpression((prev) => prev.slice(0, -1));

          break;

        case "=":
          calculate();

          break;

        case "neg":
          setExpression((prev) => {
            if (!prev) return prev;

            if (prev.startsWith("-")) return prev.slice(1);

            return "-" + prev;
          });

          break;

        default:
          if (calculated) {
            if (["+", "-", "*", "/"].includes(value)) {
              setExpression(result + value);
            } else {
              setExpression(value);
            }

            setCalculated(false);

            return;
          }

          setExpression((prev) => prev + value);
      }
    },
    [calculate, calculated, result, setExpression, setCalculated, setResult],
  );

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      const key = event.key;

      if (/[0-9+\-*/.%]/.test(key)) {
        event.preventDefault();

        handleClick(key);

        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();

        handleClick("=");

        return;
      }

      if (key === "Backspace") {
        handleClick("backspace");

        return;
      }

      if (key === "Escape") {
        handleClick("clear");
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleClick]);

  return (
    <div
      className="
      w-full h-full 
      flex flex-col 
      gap-4 
      xl:p-3 
      lg:p-2.5 
      md:p-2 
      p-1.5
    "
    >
      <CalculatorDisplay
        expression={expression}
        result={result}
        calculated={calculated}
        onClear={() => {
          setExpression("");

          setResult("0");

          setCalculated(false);
        }}
      />

      <div
        className="
        w-full 
        h-full 
        grid 
        grid-cols-4 
        gap-2
      "
      >
        {calculatorKeys.map((item) => (
          <CalculatorKeyButton
            key={item.value}
            item={item}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
