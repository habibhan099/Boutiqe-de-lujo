import React from "react";

function ProductSearch() {
  return (
    <div>
      <h1>Find Your Products</h1>

      <form>
        <input
          type="text"
          placeholder="Search products..."
        />

        <button type="submit">Search</button>
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