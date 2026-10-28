import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategoriesAxiosFunction,
  getCustomersAxiosFunction,
  getDeliveriesAxiosFunction,
  getOrdersAxiosFunction,
  getProductsAxiosFunction,
} from "../Service/api";

const managementLinks = [
  { label: "Products", countKey: "products", path: "/products" },
  { label: "Categories", countKey: "categories", path: "/categories" },
  { label: "Orders", countKey: "orders", path: "/orders" },
  { label: "Customers", countKey: "customers", path: "/customers" },
  { label: "Delivery Persons", countKey: "deliveries", path: "/deliveries" },
];

function AdminDashboard() {
  const [counts, setCounts] = useState({
    products: null,
    categories: null,
    orders: null,
    customers: null,
    deliveries: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCounts() {
      setLoading(true);
      setError("");

      const requests = await Promise.allSettled([
        getProductsAxiosFunction(),
        getCategoriesAxiosFunction(),
        getOrdersAxiosFunction(),
        getCustomersAxiosFunction(),
        getDeliveriesAxiosFunction(),
      ]);

      if (!active) return;

      const responseKeys = [
        ["products", "products"],
        ["categories", "categories"],
        ["orders", "orders"],
        ["customers", "customers"],
        ["deliveries", "deliveries"],
      ];

      const nextCounts = {};
      let hasError = false;

      requests.forEach((result, index) => {
        const [countKey, responseKey] = responseKeys[index];
        const records =
          result.status === "fulfilled"
            ? result.value.data?.[responseKey]
            : undefined;

        if (!Array.isArray(records)) {
          hasError = true;
          nextCounts[countKey] = null;
          return;
        }

        nextCounts[countKey] = records.length;
      });

      setCounts(nextCounts);
      setError(hasError ? "Some dashboard totals could not be loaded." : "");
      setLoading(false);
    }

    loadCounts();

    window.addEventListener("boutique-data-changed", loadCounts);
    window.addEventListener("focus", loadCounts);

    return () => {
      window.removeEventListener("boutique-data-changed", loadCounts);
      window.removeEventListener("focus", loadCounts);
      active = false;
    };
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome to the Admin Panel</p>

      {error && <p role="alert">{error}</p>}

      <hr />

      {managementLinks.map(({ label, countKey, path }) => (
        <Link
          key={countKey}
          to={path}
          aria-label={`Open ${label} management`}
          style={{
            display: "block",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <h3>Total {label}</h3>
          <h2>
            {loading
              ? "..."
              : counts[countKey] === null
                ? "Unavailable"
                : counts[countKey]}
          </h2>
        </Link>
      ))}

      <hr />

      <h2>Admin Menu</h2>

      {managementLinks.map(({ label, path }) => (
        <p key={path}>
          <Link to={path}>{label}</Link>
        </p>
      ))}
    </div>
  );
}

export default AdminDashboard;