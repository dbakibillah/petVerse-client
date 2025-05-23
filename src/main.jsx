import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// react router v6.30.1
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import AuthProvider from "./providers/AuthProviders";
import ThemeProvider from "./providers/ThemeProvider";
import Login from "./pages/common/Login";
import Registration from "./pages/common/Registration";
import Shop from "./pages/shop/shop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./components/shop/ProductDetails";

// tanstackQuery
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <h1 className="text-3xl dark:text-white">Home</h1>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Registration />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/product/:productId",
                element: <ProductDetails />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </StrictMode>
);
