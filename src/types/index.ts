export type Status = "pending" | "completed" | "rejected";
export type OperationType = "withdrawal" | "deposit";

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: Status;
  timestamp: string;
  type: OperationType;
};

export type Equiv = { eurEquiv: string };

export type Rates = Record<string, number | null>;
