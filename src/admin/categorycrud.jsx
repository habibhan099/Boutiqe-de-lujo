import React from "react";

function CategoryCRUD() {
  return (
    <div>
      <h1>Category Management</h1>

      <h2>Add New Category</h2>

      <form>
        <div>
          <label>Category Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter category name"
          />
        </div>

        <br />

        <div>
          <label>Category Description</label>
          <br />
          <textarea
            placeholder="Enter category description"
          ></textarea>
        </div>

        <br />

        <div>
          <label>Category Image</label>
          <br />
          <input type="file" />
        </div>

        <br />

        <button type="submit">Create Category</button>
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
          <tr>
            <td>1</td>
            <td>Men</td>
            <td>Men's Clothing</td>
            <td>Image</td>
            <td>
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Women</td>
            <td>Women's Clothing</td>
            <td>Image</td>
            <td>
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Kids</td>
            <td>Kids Clothing</td>
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

export default CategoryCRUD;