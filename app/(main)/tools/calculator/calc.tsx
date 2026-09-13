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

const OPERATORS = ["+", "-", "*", "/"];

const evaluateExpression = (expression: string): number => {
  const normalized = expression
    .replace(/\s/g, "")
    .replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");

  if (!normalized || !/^[0-9+\-*/().]+$/.test(normalized)) {
    throw new Error("Invalid expression");
  }

  const tokens = normalized.match(
    /(?:\d+(?:\.\d+)?)|[()+\-*/]/g,
  );

  if (!tokens || tokens.join("") !== normalized) {
    throw new Error("Invalid expression");
  }

  let position = 0;

  const parseExpression = (): number => {
    let value = parseTerm();

    while (
      position < tokens.length &&
      (tokens[position] === "+" || tokens[position] === "-")
    ) {
      const operator = tokens[position++];
      const right = parseTerm();

      value = operator === "+" ? value + right : value - right;
    }

    return value;
  };

  const parseTerm = (): number => {
    let value = parseFactor();

    while (
      position < tokens.length &&
      (tokens[position] === "*" || tokens[position] === "/")
    ) {
      const operator = tokens[position++];
      const right = parseFactor();

      if (operator === "/" && right === 0) {
        throw new Error("Division by zero");
      }

      value = operator === "*" ? value * right : value / right;
    }

    return value;
  };

  const parseFactor = (): number => {
    if (position >= tokens.length) {
      throw new Error("Invalid expression");
    }

    const token = tokens[position];

    if (token === "+") {
      position++;
      return parseFactor();
    }

    if (token === "-") {
      position++;
      return -parseFactor();
    }

    if (token === "(") {
      position++;

      const value = parseExpression();

      if (tokens[position] !== ")") {
        throw new Error("Invalid expression");
      }

      position++;
      return value;
    }

    position++;

    const value = Number(token);

    if (!Number.isFinite(value)) {
      throw new Error("Invalid number");
    }

    return value;
  };

  const result = parseExpression();

  if (position !== tokens.length || !Number.isFinite(result)) {
    throw new Error("Invalid expression");
  }

  return result;
};

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
      const resultValue = String(evaluateExpression(expression));

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

            if (prev.startsWith("-")) {
              return prev.slice(1);
            }

            return `-${prev}`;
          });
          break;

        default:
          if (calculated) {
            if (OPERATORS.includes(value)) {
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
    [
      calculate,
      calculated,
      result,
      setExpression,
      setCalculated,
      setResult,
    ],
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
    <div className="flex h-full w-full flex-col gap-4 xl:p-3 lg:p-2.5 md:p-2 p-1.5">
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

      <div className="grid h-full w-full grid-cols-4 gap-2">
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
