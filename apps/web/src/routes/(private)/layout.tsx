import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Outlet } from "react-router"


const queryClient = new QueryClient()


export const LayoutPrivate = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <Outlet />
            </div>
        </QueryClientProvider>
    )
}