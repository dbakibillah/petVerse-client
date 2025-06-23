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
import Grooming from "./pages/grooming/Grooming";
import Forum from "./pages/forum/Forum";
import UserProfile from "./pages/user/UserProfile";
import HealthCare from "./pages/healthcare/HealthCare";
import PrivateRoute from "./routes/PrivateRoute";
import GroomingAppointment from "./pages/grooming/GroomingAppoinment";
import Dashboard from "./pages/dashboard/Dashboard";
import GroomingAdmin from "./components/dashboard/GroomingAdmin";

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
                element: (
                    <PrivateRoute>
                        <Forum />
                    </PrivateRoute>
                ),
            },
            {
                path: "/profile",
                element: <UserProfile />,
            },
            {
                path: "/grooming",
                element: <Grooming />,
            },
            {
                path: "/grooming-appointment",
                element: <GroomingAppointment />,
            },
            {
                path: "/healthcare",
                element: <HealthCare />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            // Admin Dashboard Routes
            {
                path: "grooming",
                element: <GroomingAdmin />,
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
