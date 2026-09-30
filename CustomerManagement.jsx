import React from "react";

function CustomerManagement() {
  return (
    <div>
      <h1>Customer Management</h1>

      <h2>Customer Details</h2>

      <form>
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
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter customer email"
          />
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="tel"
            placeholder="Enter phone number"
          />
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />
          <textarea
            placeholder="Enter customer address"
          ></textarea>
        </div>

        <br />

        <button type="submit">Add Customer</button>
      </form>

      <hr />

      <h2>Customer List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Ali Khan</td>
            <td>ali@gmail.com</td>
            <td>03001234567</td>
            <td>Islamabad</td>
            <td>
              <button>View</button>{" "}
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Ahmed Khan</td>
            <td>ahmed@gmail.com</td>
            <td>03111234567</td>
            <td>Rawalpindi</td>
            <td>
              <button>View</button>{" "}
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerManagement;