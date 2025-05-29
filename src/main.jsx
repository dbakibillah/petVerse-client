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
import Home from "./pages/common/Home";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./providers/CartProvider";
import { ToastContainer } from "react-toastify";
import Forum from "./pages/forum/Forum";

// tanstackQuery
const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
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
                path: "/product/:id",
                element: <ProductDetails />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/forum",
                element: <Forum />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <CartProvider>
                        <RouterProvider router={router} />
                    </CartProvider>
                </AuthProvider>
            </QueryClientProvider>
        </ThemeProvider>
        <ToastContainer />
    </StrictMode>
);
