import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoriesAxiosFunction } from "../Service/api";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        const response = await getCategoriesAxiosFunction();
        const data = response.data;
        const records = Array.isArray(data) ? data : data.categories || [];
        if (active) setCategories(records.filter((category) => category.image?.data));
      } catch (loadError) {
        if (active) {
          setError(loadError.response?.data?.message || "Categories could not be loaded.");
        }
      }
    }

    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="section category-section">
      <h2>Shop By Category</h2>

      {error && <p role="alert">{error}</p>}

      <div className="category-grid">
        {categories.map((category) => (
          <Link
            className="category-card"
            key={category._id || category.categoryId || category.name}
            to="/product-search"
          >
            <div className="category-image">
              <img src={category.image.data} alt={category.name} />
            </div>
            <p>{category.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}