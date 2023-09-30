import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Flowbite } from "flowbite-react";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Flowbite>
      <App />
    </Flowbite>
  </QueryClientProvider>
);
