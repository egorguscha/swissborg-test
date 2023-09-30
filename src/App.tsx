import { DarkThemeToggle, Navbar } from "flowbite-react";
import { Transactions } from "./components/transactions";
import { Summary } from "./components/summary";

export function App() {
  return (
    <>
      <Navbar fluid className="sticky mb-8">
        <DarkThemeToggle />
      </Navbar>

      <div className="container mx-auto">
        <div className="mb-4">
          <Transactions />
        </div>
        <div>
          <Summary />
        </div>
      </div>
    </>
  );
}
