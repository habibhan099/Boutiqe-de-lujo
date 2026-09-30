import React from "react";

function ProductCRUD() {
  return (
    <div>
      <h1>Product Management</h1>

      <h2>Add New Product</h2>

      <form>
        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter product name"
          />
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />
          <input
            type="number"
            placeholder="Enter price"
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />
          <select>
            <option>Select Category</option>
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <br />

        <div>
          <label>Product Image</label>
          <br />
          <input type="file" />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            placeholder="Enter product description"
          ></textarea>
        </div>

        <br />

        <button type="submit">Create Product</button>
      </form>

      <hr />

      <h2>Product List</h2>

      <table border="1" cellPadding="10">
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
          <tr>
            <td>1</td>
            <td>Men T-Shirt</td>
            <td>Rs. 1500</td>
            <td>Men</td>
            <td>Image</td>
            <td>
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Women Dress</td>
            <td>Rs. 3000</td>
            <td>Women</td>
            <td>Image</td>
            <td>
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductCRUD;