import { Table } from "flowbite-react";
import { useSummary } from "./hooks/use-summary";

export const Summary = () => {
  const { isLoading, data: transactions } = useSummary();

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
              key={row.currency}
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
