"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
    // Implement a singleton pattern for QueryClient to ensure it's not recreated on every render
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
            }
        }
    }));
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}