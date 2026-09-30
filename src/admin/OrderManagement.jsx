import React from "react";

function OrderManagement() {
  return (
    <div>
      <h1>Order Management</h1>

      <h2>Order Details</h2>

      <form>
        <div>
          <label>Order ID</label>
          <br />
          <input
            type="text"
            placeholder="Enter order ID"
          />
        </div>

        <br />

        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter customer name"
          />
        </div>

        <br />

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
          <label>Quantity</label>
          <br />
          <input
            type="number"
            placeholder="Enter quantity"
          />
        </div>

        <br />

        <div>
          <label>Total Amount</label>
          <br />
          <input
            type="number"
            placeholder="Enter total amount"
          />
        </div>

        <br />

        <div>
          <label>Order Status</label>
          <br />

          <select>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        <br />

        <button type="submit">Update Order</button>
      </form>

      <hr />

      <h2>Order List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>ORD-001</td>
            <td>Ali Khan</td>
            <td>Men T-Shirt</td>
            <td>2</td>
            <td>Rs. 3000</td>
            <td>Pending</td>
            <td>
              <button>View</button>{" "}
              <button>Update</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>ORD-002</td>
            <td>Ahmed</td>
            <td>Women Dress</td>
            <td>1</td>
            <td>Rs. 3000</td>
            <td>Delivered</td>
            <td>
              <button>View</button>{" "}
              <button>Update</button>{" "}
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderManagement;