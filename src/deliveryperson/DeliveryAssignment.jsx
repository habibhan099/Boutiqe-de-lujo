import React from "react";

function DeliveryAssignment() {
  return (
    <div>
      <h1>Delivery Assignment</h1>

      <h2>Assigned Orders</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Product</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>ORD-001</td>
            <td>Ali Khan</td>
            <td>03001234567</td>
            <td>Abbottabad</td>
            <td>Men T-Shirt</td>
            <td>Assigned</td>
          </tr>

          <tr>
            <td>ORD-002</td>
            <td>Ahmed</td>
            <td>03111234567</td>
            <td>Mansehra</td>
            <td>Women Dress</td>
            <td>Assigned</td>
          </tr>
        </tbody>
      </table>

      <br />

      <button>View Order</button>
      <button>Accept Delivery</button>
    </div>
  );
}

export default DeliveryAssignment;