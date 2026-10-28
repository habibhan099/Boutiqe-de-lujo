import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { productSearchAxiosFunction } from "../Service/api";

const searchSchema = z.object({
  query: z.string().trim().min(2, "Enter at least 2 characters to search."),
});

function ProductSearch() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(searchSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await productSearchAxiosFunction(data);
  }

  return (
    <div>
      <h1>Find Your Products</h1>

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <input
          type="text"
          placeholder="Search products..."
          {...register("query")}
        />

        <button type="submit">Search</button>
        {errors.query && <p role="alert">{errors.query.message}</p>}
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/order-form">Place an order</Link>
          <Link to="/checkout">Go to checkout</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>

      <br />

      <label>Category</label>
      <br />

      <select>
        <option>All Categories</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>

      <br /><br />

      <label>Price Range</label>
      <br />

      <select>
        <option>All Prices</option>
        <option>Under Rs. 1000</option>
        <option>Rs. 1000 - Rs. 3000</option>
        <option>Rs. 3000 - Rs. 5000</option>
        <option>Above Rs. 5000</option>
      </select>

      <hr />

      <h2>Products</h2>

      <div>
        <h3>Men T-Shirt</h3>
        <p>Rs. 1500</p>
        <button>View Product</button>
        <button>Add to Cart</button>
      </div>

      <div>
        <h3>Women Dress</h3>
        <p>Rs. 3000</p>
        <button>View Product</button>
        <button>Add to Cart</button>
      </div>

      <div>
        <h3>Kids Shirt</h3>
        <p>Rs. 1200</p>
        <button>View Product</button>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductSearch;