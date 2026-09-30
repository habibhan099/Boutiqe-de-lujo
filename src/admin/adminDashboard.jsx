import React from "react";

function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>Welcome to the Admin Panel</p>

      <hr />

      <div>
        <h3>Total Products</h3>
        <h2>120</h2>
      </div>

      <div>
        <h3>Total Customers</h3>
        <h2>85</h2>
      </div>

      <div>
        <h3>Total Orders</h3>
        <h2>45</h2>
      </div>

      <div>
        <h3>Delivery Persons</h3>
        <h2>12</h2>
      </div>

      <hr />

      <h2>Admin Menu</h2>

      <button>Products</button>
      <button>Categories</button>
      <button>Orders</button>
      <button>Customers</button>
      <button>Delivery Persons</button>

    </div>
  );
}

export default AdminDashboard;