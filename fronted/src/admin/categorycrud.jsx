
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  categoryCrudAxiosFunction,
  getCategoriesAxiosFunction,
  deleteCategoryAxiosFunction,
} from "../Service/api";

const categorySchema = z.object({
  categoryId: z.string().trim().optional(),
  name: z.string().trim().min(2, "Enter a category name."),
  description: z.string().trim().min(5, "Enter a category description."),
  image: z.any().refine(
    (value) => !value || value.length > 0,
    "Category image is required."
  ),
});

function CategoryCRUD() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryId: "",
      name: "",
      description: "",
    },
  });

  async function loadCategories() {
    try {
      const response = await getCategoriesAxiosFunction();
      const data = response.data;
      setCategories(
        Array.isArray(data) ? data : data.categories || []
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Categories load nahi ho sakin. Backend check karein."
      );
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function myFormSubmissionFunction(data) {
    if (!editingId && (!data.image || data.image.length === 0)) {
      setMessage("Category image required hai.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      await categoryCrudAxiosFunction({
        ...data,
        id: editingId || undefined,
      });

      setMessage(
        editingId
          ? "Category successfully updated!"
          : "Category successfully created!"
      );

      reset({ categoryId: "", name: "", description: "", image: undefined });
      setEditingId(null);

      await loadCategories();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Category save nahi ho saki."
      );
    } finally {
      setLoading(false);
    }
  }

  function editCategory(category) {
    setEditingId(category._id || category.id);

    reset({
      categoryId: category.categoryId || "",
      name: category.name || "",
      description: category.description || "",
      image: undefined,
    });

    setMessage("Category edit karein aur form submit karein.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeCategory(id) {
    if (!window.confirm("Kya aap is category ko delete karna chahte hain?")) {
      return;
    }

    setMessage("");

    try {
      await deleteCategoryAxiosFunction(id);
      setMessage("Category successfully deleted!");
      if (editingId === id) {
        reset({ categoryId: "", name: "", description: "", image: undefined });
        setEditingId(null);
      }
      await loadCategories();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Category delete nahi ho saki."
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    reset({ categoryId: "", name: "", description: "", image: undefined });
    setMessage("");
  }

  return (
    <div>
      <h1>Category Management</h1>

      <h2>{editingId ? "Edit Category" : "Add New Category"}</h2>

      {message && <p role="status">{message}</p>}

      <form
        onSubmit={handleSubmit(myFormSubmissionFunction)}
        encType="multipart/form-data"
        noValidate
      >
        <div>
          <label htmlFor="category-id">Category ID</label>
          <br />
          <input
            id="category-id"
            type="text"
            placeholder="Enter custom category ID (optional)"
            {...register("categoryId")}
          />
          {errors.categoryId && (
            <p role="alert">{errors.categoryId.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="category-name">Category Name</label>
          <br />
          <input
            id="category-name"
            type="text"
            placeholder="Enter category name"
            {...register("name")}
          />
          {errors.name && (
            <p role="alert">{errors.name.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="category-description">
            Category Description
          </label>
          <br />
          <textarea
            id="category-description"
            placeholder="Enter category description"
            {...register("description")}
          />
          {errors.description && (
            <p role="alert">{errors.description.message}</p>
          )}
        </div>

        <br />

        <div>
          <label htmlFor="category-image">Category Image</label>
          <br />
          <input
            id="category-image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : editingId
              ? "Update Category"
              : "Create Category"}
        </button>

        {editingId && (
          <button type="button" onClick={cancelEdit}>
            Cancel Edit
          </button>
        )}

        <nav className="form-links" aria-label="Related pages">
          <Link to="/products">Product management</Link>{" "}
          <Link to="/admin-dashboard">Admin dashboard</Link>{" "}
          <Link to="/">Home</Link>
        </nav>
      </form>

      <hr />

      <h2>Category List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="5">No categories found.</td>
            </tr>
          ) : (
            categories.map((category, index) => {
              const id = category._id || category.id;
              const image = category.image?.data;

              return (
                <tr key={id || index}>
                  <td>{category.categoryId || id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    {image ? (
                      <img
                        src={image}
                        alt={category.name}
                        width="60"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => editCategory(category)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      type="button"
                      onClick={() => removeCategory(id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryCRUD;
