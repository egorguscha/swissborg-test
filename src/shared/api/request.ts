import { BASE_URL } from "../../environment";
import { Rates, Transaction } from "../../types";

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions`);
    const data = await response.json();

    return data.transactions;
  } catch (error) {
    return [];
  }
}

export async function fetchRates(): Promise<Rates | null> {
  try {
    const response = await fetch(`${BASE_URL}/api/eur-rates`);
    return response.json();
  } catch (error) {
    return null;
  }
}
