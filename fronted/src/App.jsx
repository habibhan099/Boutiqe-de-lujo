import { createBrowserRouter, Link } from "react-router-dom";
import "../style/admin.css";
import "../style/customer.css";
import "../style/delivery.css";
import Home from "./Home";
import Dashboard from "./components/dashboard/Dashboard";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/stakeholders", element: <Dashboard /> },
  { path: "/admin", element: <Dashboard groupId="admin" /> },
  { path: "/admin-login", element: <Dashboard groupId="admin" formId="admin-login" /> },
  { path: "/admin-dashboard", element: <Dashboard groupId="admin" formId="admin-dashboard" /> },
  { path: "/customers", element: <Dashboard groupId="admin" formId="customers" /> },
  { path: "/products", element: <Dashboard groupId="admin" formId="products" /> },
  { path: "/categories", element: <Dashboard groupId="admin" formId="categories" /> },
  { path: "/orders", element: <Dashboard groupId="admin" formId="orders" /> },
  { path: "/deliveries", element: <Dashboard groupId="admin" formId="deliveries" /> },
  { path: "/customer", element: <Dashboard groupId="customer" /> },
  { path: "/customer-login", element: <Dashboard groupId="customer" formId="customer-login" /> },
  { path: "/registration", element: <Dashboard groupId="customer" formId="registration" /> },
  { path: "/product-search", element: <Dashboard groupId="customer" formId="product-search" /> },
  { path: "/order-form", element: <Dashboard groupId="customer" formId="order-form" /> },
  { path: "/checkout", element: <Dashboard groupId="customer" formId="checkout" /> },
  { path: "/delivery", element: <Dashboard groupId="delivery" /> },
  { path: "/delivery-login", element: <Dashboard groupId="delivery" formId="delivery-login" /> },
  { path: "/delivery-registration", element: <Dashboard groupId="delivery" formId="delivery-registration" /> },
  { path: "/assignment", element: <Dashboard groupId="delivery" formId="assignment" /> },
  { path: "/delivery-status", element: <Dashboard groupId="delivery" formId="delivery-status" /> },
  { path: "/confirmation", element: <Dashboard groupId="delivery" formId="confirmation" /> },
  { path: "/login", element: <Dashboard groupId="customer" formId="customer-login" /> },
  { path: "/signup", element: <Dashboard groupId="customer" formId="registration" /> },
  { path: "*", element: <main><h1>Page not found</h1><Link to="/">Home</Link></main> },
]);
