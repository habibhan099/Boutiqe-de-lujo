import React from "react";

function DeliveryManagement() {
  return (
    <div>
      <h1>Delivery Person Management</h1>

      <h2>Add Delivery Person</h2>

      <form>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter delivery person name"
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
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
            placeholder="Enter address"
          ></textarea>
        </div>

        <br />

        <div>
          <label>Delivery Status</label>
          <br />
          <select>
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </div>

        <br />

        <button type="submit">Add Delivery Person</button>
      </form>

      <hr />

      <h2>Delivery Person List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>1</td>
            <td>Usman Ali</td>
            <td>usman@gmail.com</td>
            <td>03001234567</td>
            <td>Abbottabad</td>
            <td>Available</td>
            <td>
              <button>View</button>{" "}
              <button>Edit</button>{" "}
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Hassan</td>
            <td>hassan@gmail.com</td>
            <td>03111234567</td>
            <td>Islamabad</td>
            <td>Busy</td>
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

export default DeliveryManagement;