import { useQueries, useQuery } from "react-query";
import { fetchTransactions, fetchRates } from "../shared/api";
import { Equiv, Transaction } from "../types";
import { getEquivalent } from "../shared/lib/format";

export function useTransactions(): {
  isLoading: boolean;
  data: (Transaction & Equiv)[];
} {
  const [
    { data: transactionsRes, isLoading: isTransactionsLoading },
    { data: ratesRes, isLoading: isRatesLoading },
  ] = useQueries([
    {
      queryKey: ["fetch-transactions"],
      queryFn: fetchTransactions,
    },
    {
      queryKey: ["fetch-rates"],
      queryFn: fetchRates,
    },
  ]);
  const isLoading =
    !transactionsRes || !ratesRes || isTransactionsLoading || isRatesLoading;

  if (isLoading) {
    return { isLoading, data: [] };
  }
  const transactions = transactionsRes.map((item) => {
    const rate = ratesRes?.[item.currency] ?? "";

    let equiv = rate.toString();

    if (rate) {
      equiv = getEquivalent(item.amount, Number(rate));
    }

    return {
      ...item,
      eurEquiv: equiv,
      timestamp: new Date(item.timestamp).toLocaleDateString(),
    };
  });

  return { isLoading, data: transactions };
}
export function useRates() {
  return useQuery({
    queryKey: ["fetch-rates"],
    queryFn: fetchRates,
  });
}
