import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import {
  deleteOrderAxiosFunction,
  getOrdersAxiosFunction,
  orderManagementAxiosFunction,
} from "../Service/api";

const orderSchema = z.object({
  orderId: z.string().trim().min(1, "Enter an order ID."),
  customerName: z.string().trim().min(2, "Enter the customer's name."),
  productName: z.string().trim().min(2, "Enter a product name."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  total: z.coerce.number().positive("Total amount must be greater than zero."),
  status: z.string().min(1, "Select an order status."),
});

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(orderSchema),
  });

  async function loadOrders() {
    setLoading(true);
    try {
      const response = await getOrdersAxiosFunction();
      setOrders(response.data.orders);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    setSubmitting(true);
    setMessage("");
    try {
      await orderManagementAxiosFunction({ ...data, id: editingId });
      setMessage(editingId ? "Order updated successfully." : "Order created successfully.");
      reset();
      setEditingId(null);
      await loadOrders();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function editOrder(order) {
    setEditingId(order._id);
    setSelectedOrder(null);
    reset({
      orderId: order.orderId,
      customerName: order.customerName,
      productName: order.productName,
      quantity: order.quantity,
      total: order.total,
      status: order.status,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    reset();
  }

  async function deleteOrder(id) {
    if (!window.confirm("Delete this order?")) return;
    setSubmitting(true);
    setMessage("");
    try {
      await deleteOrderAxiosFunction(id);
      setMessage("Order deleted successfully.");
      if (editingId === id) cancelEdit();
      if (selectedOrder?._id === id) setSelectedOrder(null);
      await loadOrders();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Order Management</h1>

      <h2>{editingId ? "Edit Order" : "Create Order"}</h2>
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Order ID</label>
          <br />
          <input
            type="text"
            placeholder="Enter order ID"
            {...register("orderId")}
          />
          {errors.orderId && <p role="alert">{errors.orderId.message}</p>}
        </div>

        <br />

        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter customer name"
            {...register("customerName")}
          />
          {errors.customerName && <p role="alert">{errors.customerName.message}</p>}
        </div>

        <br />

        <div>
          <label>Product Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter product name"
            {...register("productName")}
          />
          {errors.productName && <p role="alert">{errors.productName.message}</p>}
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            placeholder="Enter quantity"
            {...register("quantity")}
          />
          {errors.quantity && <p role="alert">{errors.quantity.message}</p>}
        </div>

        <br />

        <div>
          <label>Total Amount</label>
          <br />
          <input
            type="number"
            placeholder="Enter total amount"
            {...register("total")}
          />
          {errors.total && <p role="alert">{errors.total.message}</p>}
        </div>

        <br />

        <div>
          <label>Order Status</label>
          <br />

          <select {...register("status")}>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          {errors.status && <p role="alert">{errors.status.message}</p>}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : editingId ? "Update Order" : "Create Order"}
        </button>
        {editingId && (
          <>
            {" "}
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </>
        )}
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/deliveries">Delivery management</Link>
          <Link to="/admin-dashboard">Admin dashboard</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>

      <hr />

      <h2>Order List</h2>

      {loading ? <p>Loading orders...</p> : (
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
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>{order.productName}</td>
              <td>{order.quantity}</td>
              <td>Rs. {order.total}</td>
              <td>{order.status}</td>
              <td>
                <button type="button" onClick={() => setSelectedOrder(order)}>View</button>{" "}
                <button type="button" onClick={() => editOrder(order)}>Update</button>{" "}
                <button type="button" onClick={() => deleteOrder(order._id)} disabled={submitting}>Delete</button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr><td colSpan="7">No orders found.</td></tr>
          )}
        </tbody>
      </table>
      )}

      {selectedOrder && (
        <section>
          <h2>Order Details</h2>
          <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
          <p><strong>Customer:</strong> {selectedOrder.customerName}</p>
          <p><strong>Product:</strong> {selectedOrder.productName}</p>
          <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
          <p><strong>Total:</strong> Rs. {selectedOrder.total}</p>
          <p><strong>Status:</strong> {selectedOrder.status}</p>
          {selectedOrder.phone && <p><strong>Phone:</strong> {selectedOrder.phone}</p>}
          {selectedOrder.address && <p><strong>Address:</strong> {selectedOrder.address}</p>}
        </section>
      )}
    </div>
  );
}

export default OrderManagement;