export type KeyType =
  | "number"
  | "operator"
  | "action"
  | "equal";

export interface CalculatorKey {
  value: string;
  label: string;
  type: KeyType;
}

export const calculatorKeys: CalculatorKey[] = [
  { label: "×", value: "*", type: "operator" },
  { label: "%", value: "%", type: "operator" },
  { label: "⌫", value: "backspace", type: "action" },
  { label: "CE", value: "clear", type: "action" },

  { label: "÷", value: "/", type: "operator" },
  { label: "9", value: "9", type: "number" },
  { label: "8", value: "8", type: "number" },
  { label: "7", value: "7", type: "number" },

  { label: "+", value: "+", type: "operator" },
  { label: "6", value: "6", type: "number" },
  { label: "5", value: "5", type: "number" },
  { label: "4", value: "4", type: "number" },

  { label: "-", value: "-", type: "operator" },
  { label: "3", value: "3", type: "number" },
  { label: "2", value: "2", type: "number" },
  { label: "1", value: "1", type: "number" },

  { label: "=", value: "=", type: "equal" },
  { label: ".", value: ".", type: "number" },
  { label: "0", value: "0", type: "number" },
  { label: "±", value: "neg", type: "action" },
];