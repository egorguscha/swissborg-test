import { expect, test } from "vitest";
import { arrayToSum } from "./use-summary";

test("should return object with sum of properties an array's objects", () => {
  const rates = 10000;
  const arr = [
    {
      id: "27a7d775-4a93-4338-b464-9f08f37371f1",
      timestamp: "2023-08-09T12:00:00.000Z",
      type: "withdrawal",
      status: "pending",
      currency: "BTC",
      amount: 5,
    },
    {
      id: "22675a35-f5d9-474b-9627-fd2c714c29c5",
      timestamp: "2023-08-08T12:00:00.000Z",
      type: "deposit",
      status: "completed",
      currency: "BTC",
      amount: 500,
    },
    {
      id: "237b6a0f-7203-4e6b-99d9-4f4759b8b2fe",
      timestamp: "2023-08-08T12:00:00.000Z",
      type: "withdrawal",
      status: "pending",
      currency: "BTC",
      amount: 10,
    },
  ];

  const completedDeposits = "total completed deposits";
  const completedWithdrawals = "total completed withdrawals";
  const pendingWithdrawals = "total pending withdrawals";
  const pendingDeposits = "total pending deposits";
  const balanceInTokens = "total balance";
  const balanceEquivTo = "total balance eur equiv";
  const currency = "currency";

  const res = {
    [currency]: "BTC",
    [completedDeposits]: 1,
    [completedWithdrawals]: 0,
    [pendingWithdrawals]: 2,
    [pendingDeposits]: 0,
    [balanceInTokens]: "500.00",
    [balanceEquivTo]: "5000000.00",
  };

  expect(arrayToSum(arr, rates)).toStrictEqual(res);
});
