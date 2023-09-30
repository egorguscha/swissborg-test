import { Table } from "flowbite-react";
import { useTransactions } from "../../hooks";

export const Transactions = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return <div>loading</div>;
  }
  const columns = Object.keys(transactions[0]);

  return (
    <div className="h-[300px] overflow-y-auto">
      <Table>
        <Table.Head>
          {columns.map((column, index) => (
            <Table.HeadCell key={index}>{column}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {transactions.map((row) => (
            <Table.Row
              key={row.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              {Object.entries(row).map(([col, value]) => (
                <Table.Cell key={col}>{value}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
