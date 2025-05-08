import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

interface IProviders {
  children: React.ReactNode;
}

export function Providers({ children }: IProviders) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
