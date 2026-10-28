
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  myFormSubmissionFunction as logFormSubmission,
} from "../utils/formSubmission";

import {
  deleteProductAxiosFunction,
  getProductsAxiosFunction,
  productCrudAxiosFunction,
} from "../Service/api";

const productSchema = z.object({
  productId: z.string().trim().optional(),
  name: z.string().trim().min(2, "Enter a product name."),
  price: z.coerce.number().positive("Price must be greater than zero."),
  category: z.enum(["Men", "Women", "Kids"], {
    error: "Select a category.",
  }),
  description: z.string().trim().min(5, "Enter a product description."),
  image: z.any().optional(),
});

function errorMessage(error) {
  return (
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred."
  );
}

function ProductImage({ image, name, width = 80 }) {
  if (!image?.url) {
    return <span>Image unavailable</span>;
  }

  return (
    <img
      src={image.url}
      alt={name || "Product"}
      width={width}
      style={{
        height: width,
        objectFit: "cover",
        borderRadius: "8px",
        display: "block",
      }}
      onError={(event) => {
        event.currentTarget.style.display = "none";
      }}
    />
  );
}

function ProductCRUD() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productId: "",
      name: "",
      price: "",
      category: "",
      description: "",
      image: undefined,
    },
  });

  async function loadProducts() {
    setLoading(true);
    setError("");

    try {
      const response = await getProductsAxiosFunction();
      setProducts(response.data.products || []);
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function startEditing(product) {
    setEditingId(product._id);
    setSelectedProduct(null);

    reset({
      productId: product.productId || "",
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || "",
      image: undefined,
    });
  }

  function cancelEditing() {
    setEditingId(null);

    reset({
      productId: "",
      name: "",
      price: "",
      category: "",
      description: "",
      image: undefined,
    });
  }

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);

    setSubmitting(true);
    setError("");

    try {
      await productCrudAxiosFunction({
        ...data,
        image: data.image,
        id: editingId,
      });

      cancelEditing();
      await loadProducts();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setSubmitting(true);
    setError("");

    try {
      await deleteProductAxiosFunction(id);

      if (editingId === id) {
        cancelEditing();
      }

      if (selectedProduct?._id === id) {
        setSelectedProduct(null);
      }

      await loadProducts();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product Management</h1>

      <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(myFormSubmissionFunction)}
        noValidate
      >
        <div>
          <label htmlFor="product-id">Product ID</label>
          <br />
          <input
            id="product-id"
            type="text"
            placeholder="Enter custom product ID (optional)"
            {...register("productId")}
          />
          {errors.productId && (
            <p role="alert">{errors.productId.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="product-name">Product Name</label>
          <br />
          <input
            id="product-name"
            type="text"
            placeholder="Enter product name"
            {...register("name")}
          />
          {errors.name && (
            <p role="alert">{errors.name.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="product-price">Price</label>
          <br />
          <input
            id="product-price"
            type="number"
            placeholder="Enter price"
            {...register("price")}
          />
          {errors.price && (
            <p role="alert">{errors.price.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="product-category">Category</label>
          <br />
          <select
            id="product-category"
            {...register("category")}
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          {errors.category && (
            <p role="alert">{errors.category.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="product-image">Product Image</label>
          <br />
          <input
            id="product-image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <p>
          
          </p>
        </div>

        <br />

        <div>
          <label htmlFor="product-description">Description</label>
          <br />
          <textarea
            id="product-description"
            placeholder="Enter product description"
            {...register("description")}
          />
          {errors.description && (
            <p role="alert">{errors.description.message}</p>
          )}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting
            ? "Saving..."
            : editingId
              ? "Update Product"
              : "Create Product"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={cancelEditing}
            disabled={submitting}
            style={{ marginLeft: "8px" }}
          >
            Cancel
          </button>
        )}

        <nav
          className="form-links"
          aria-label="Related pages"
          style={{ marginTop: "15px" }}
        >
          <Link to="/categories">Category management</Link>{" "}
          <Link to="/admin-dashboard">Admin dashboard</Link>{" "}
          <Link to="/">Home</Link>
        </nav>
      </form>

      <hr />

      <h2>Product List</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            border="1"
            cellPadding="10"
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productId || product._id}</td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.category}</td>

                  <td>
                    <ProductImage
                      image={product.image}
                      name={product.name}
                      width={80}
                    />
                  </td>

                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View
                    </button>{" "}

                    <button
                      type="button"
                      onClick={() => startEditing(product)}
                    >
                      Edit
                    </button>{" "}

                    <button
                      type="button"
                      onClick={() => deleteProduct(product._id)}
                      disabled={submitting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="6">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedProduct && (
        <section
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <h2>Product Details</h2>

          <p>
            <strong>ID:</strong> {selectedProduct._id}
          </p>

          <p>
            <strong>Name:</strong> {selectedProduct.name}
          </p>

          <p>
            <strong>Price:</strong> Rs. {selectedProduct.price}
          </p>

          <p>
            <strong>Category:</strong> {selectedProduct.category}
          </p>

          <div>
            <strong>Product Image:</strong>
            <br />
            <div style={{ marginTop: "10px" }}>
              <ProductImage
                image={selectedProduct.image}
                name={selectedProduct.name}
                width={200}
              />
            </div>
          </div>

          <p>
            <strong>Description:</strong>{" "}
            {selectedProduct.description}
          </p>

          <button
            type="button"
            onClick={() => setSelectedProduct(null)}
          >
            Close Details
          </button>
        </section>
      )}
    </div>
  );
}

export default ProductCRUD;
