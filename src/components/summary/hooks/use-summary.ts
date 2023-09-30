import { useRates, useTransactions } from "../../../hooks";
import { getEquivalent } from "../../../shared/lib/format";
import { groupBy } from "../../../shared/lib/group-by";
import { Transaction } from "../../../types";

export function arrayToSum(source: Transaction[], rate?: number | null) {
  const completedDeposits = "total completed deposits";
  const completedWithdrawals = "total completed withdrawals";
  const pendingWithdrawals = "total pending withdrawals";
  const pendingDeposits = "total pending deposits";
  const balanceInTokens = "total balance";
  const balanceEquivTo = "total balance eur equiv";
  const currency = "currency";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: Record<string, any> = {
    [currency]: source[0][currency],
    [completedDeposits]: 0,
    [completedWithdrawals]: 0,
    [pendingWithdrawals]: 0,
    [pendingDeposits]: 0,
    [balanceInTokens]: 0,
    [balanceEquivTo]: 0,
  };

  for (const tx of source) {
    if (tx.type === "deposit" && tx.status === "completed") {
      res[completedDeposits] = res[completedDeposits] + 1;
      res[balanceInTokens] = res[balanceInTokens] + tx.amount;
    }
    if (tx.type === "withdrawal" && tx.status === "completed") {
      res[completedWithdrawals] = res[completedWithdrawals] + 1;
      res[balanceInTokens] =
        res[balanceInTokens] === 0 ? 0 : res[balanceInTokens] - tx.amount;
    }
    if (tx.type === "withdrawal" && tx.status === "pending") {
      res[pendingWithdrawals] = res[pendingWithdrawals] + 1;
    }
    if (tx.type === "deposit" && tx.status === "pending") {
      res[pendingDeposits] = res[pendingDeposits] + 1;
    }
  }

  res[balanceEquivTo] = rate
    ? getEquivalent(res[balanceInTokens], rate)
    : res[balanceEquivTo].toString();
  res[balanceInTokens] = res[balanceInTokens].toFixed(2);

  return res;
}

export function useSummary() {
  const { data: transactions, isLoading: isTransactionsLoading } =
    useTransactions();
  const { data: rates, isLoading: isRatesLoading } = useRates();

  const isLoading =
    isTransactionsLoading || isRatesLoading || !transactions || !rates;
  if (isLoading) {
    return { isLoading, data: [] };
  }

  const groupedByCurrency = groupBy(transactions, "currency");

  const transformedTransactions = Object.entries(groupedByCurrency).map(
    ([currency, txs]) => arrayToSum(txs, rates[currency])
  );

  return { isLoading, data: transformedTransactions };
}
