import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import GroomingAdmin from "./components/dashboard/GroomingAdmin";
import HealthCareAdmin from "./components/dashboard/HealthCareAdmin";
import MyGroomingAppointments from "./components/dashboard/user/MyGroomingAppoinments";
import MyOrders from "./components/dashboard/user/MyOrders";
import ProductDetails from "./components/shop/ProductDetails";

import Cart from "./pages/cart/Cart";
import AboutUs from "./pages/common/AboutUs";
import ContactUs from "./pages/common/ContactUs";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Registration from "./pages/common/Registration";

import AddProduct from "./pages/dashboard/AddProduct";
import AdminAnalytics from "./pages/dashboard/AdminAnalytics";
import Dashboard from "./pages/dashboard/Dashboard";
import ProfilePage from "./pages/dashboard/ProfilePage";
import Forum from "./pages/forum/Forum";
import Grooming from "./pages/grooming/Grooming";
import GroomingAppointment from "./pages/grooming/GroomingAppoinment";
import HealthCare from "./pages/healthcare/HealthCare";
import HealthCareAppointment from "./pages/healthcare/HealthCareAppointment";
import AllProducts from "./pages/shop/AllProducts";
import Shop from "./pages/shop/shop";
import Payment from "./payment/Payment";

import AuthProvider from "./providers/AuthProviders";
import { CartProvider } from "./providers/CartProvider";
import ThemeProvider from "./providers/ThemeProvider";
import PrivateRoute from "./routes/PrivateRoute";
import Root from "./routes/Root";

// NEW PAGE
import PetHealthWellness from "./components/home/PetHealthWellness";
import AdminProductDashboard from "./pages/dashboard/admin/AdminProductDashboard";

// Initialize Query Client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
      { path: "/shop", element: <Shop /> },
      { path: "/product/:id", element: <ProductDetails /> },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/forum",
        element: (
          <PrivateRoute>
            <Forum />
          </PrivateRoute>
        ),
      },
      { path: "/grooming", element: <Grooming /> },
      {
        path: "/grooming-appointment",
        element: (
          <PrivateRoute>
            <GroomingAppointment />
          </PrivateRoute>
        ),
      },
      { path: "/healthcare", element: <HealthCare /> },
      {
        path: "/healthcare-appointment",
        element: (
          <PrivateRoute>
            <HealthCareAppointment />
          </PrivateRoute>
        ),
      },
      { path: "/products", element: <AllProducts /> },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
      // NEW PAGE ROUTE
      { path: "/pethealthwellness", element: <PetHealthWellness /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard/grooming", element: <GroomingAdmin /> },
      { path: "/dashboard/healthappointments", element: <HealthCareAdmin /> },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      { path: "/dashboard/mygroomingappointments", element: <MyGroomingAppointments /> },
      { path: "/dashboard/admin-analytics", element: <AdminAnalytics /> },
      { path: "/dashboard/my-orders", element: <MyOrders /> },
      { path: "/dashboard/add-product", element: <AddProduct /> },
      { path: "/dashboard/admin-products", element: <AdminProductDashboard /> },
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
