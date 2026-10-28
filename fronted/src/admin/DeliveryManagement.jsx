import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import {
  deleteDeliveryAxiosFunction,
  deliveryManagementAxiosFunction,
  getDeliveriesAxiosFunction,
} from "../Service/api";

const deliveryPersonSchema = z.object({
  deliveryId: z.string().trim().min(1, "Enter a delivery person ID."),
  name: z.string().trim().min(2, "Enter a name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number."),
  address: z.string().trim().min(5, "Enter an address."),
  status: z.enum(["Available", "Busy", "Offline"]),
});

function DeliveryManagement() {
  const [deliveries, setDeliveries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(deliveryPersonSchema),
  });

  async function loadDeliveries() {
    setLoading(true);
    try {
      const response = await getDeliveriesAxiosFunction();
      setDeliveries(response.data.deliveries);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadDeliveries(); }, []);

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    setSubmitting(true);
    setMessage("");
    try {
      await deliveryManagementAxiosFunction({ ...data, id: editingId });
      setMessage(editingId ? "Delivery person updated successfully." : "Delivery person added successfully.");
      reset();
      setEditingId(null);
      await loadDeliveries();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function editDelivery(delivery) {
    setEditingId(delivery._id);
    setSelectedDelivery(null);
    reset({ deliveryId: delivery.deliveryId || "", name: delivery.name, email: delivery.email,
      phone: delivery.phone, address: delivery.address, status: delivery.status });
  }

  function cancelEdit() {
    setEditingId(null);
    reset();
  }

  async function deleteDelivery(id) {
    if (!window.confirm("Delete this delivery person?")) return;
    setSubmitting(true);
    setMessage("");
    try {
      await deleteDeliveryAxiosFunction(id);
      setMessage("Delivery person deleted successfully.");
      if (editingId === id) cancelEdit();
      if (selectedDelivery?._id === id) setSelectedDelivery(null);
      await loadDeliveries();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Delivery Person Management</h1>

      <h2>{editingId ? "Edit Delivery Person" : "Add Delivery Person"}</h2>
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Delivery ID</label>
          <br />
          <input type="text" placeholder="Enter delivery person ID" {...register("deliveryId")} />
          {errors.deliveryId && <p role="alert">{errors.deliveryId.message}</p>}
        </div>

        <br />
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter delivery person name"
            {...register("name")}
          />
          {errors.name && <p role="alert">{errors.name.message}</p>}
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter email"
            {...register("email")}
          />
          {errors.email && <p role="alert">{errors.email.message}</p>}
        </div>

        <br />

        <div>
          <label>Phone Number</label>
          <br />
          <input
            type="tel"
            placeholder="Enter phone number"
            {...register("phone")}
          />
          {errors.phone && <p role="alert">{errors.phone.message}</p>}
        </div>

        <br />

        <div>
          <label>Address</label>
          <br />
          <textarea
            placeholder="Enter address"
            {...register("address")}
          ></textarea>
          {errors.address && <p role="alert">{errors.address.message}</p>}
        </div>

        <br />

        <div>
          <label>Delivery Status</label>
          <br />
          <select {...register("status")}>
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
          {errors.status && <p role="alert">{errors.status.message}</p>}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : editingId ? "Update Delivery Person" : "Add Delivery Person"}
        </button>
        {editingId && (
          <> {" "}<button type="button" onClick={cancelEdit}>Cancel</button></>
        )}
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/orders">Order management</Link>
          <Link to="/admin-dashboard">Admin dashboard</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>

      <hr />

      <h2>Delivery Person List</h2>

      {loading ? <p>Loading delivery persons...</p> : (
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
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.deliveryId || delivery._id}</td>
              <td>{delivery.name}</td>
              <td>{delivery.email}</td>
              <td>{delivery.phone}</td>
              <td>{delivery.address}</td>
              <td>{delivery.status}</td>
              <td>
                <button type="button" onClick={() => setSelectedDelivery(delivery)}>View</button>{" "}
                <button type="button" onClick={() => editDelivery(delivery)}>Edit</button>{" "}
                <button type="button" onClick={() => deleteDelivery(delivery._id)} disabled={submitting}>Delete</button>
              </td>
            </tr>
          ))}
          {deliveries.length === 0 && (
            <tr><td colSpan="7">No delivery persons found.</td></tr>
          )}
        </tbody>
      </table>
      )}

      {selectedDelivery && (
        <section>
          <h2>Delivery Person Details</h2>
          <p><strong>ID:</strong> {selectedDelivery.deliveryId || selectedDelivery._id}</p>
          <p><strong>Name:</strong> {selectedDelivery.name}</p>
          <p><strong>Email:</strong> {selectedDelivery.email}</p>
          <p><strong>Phone:</strong> {selectedDelivery.phone}</p>
          <p><strong>Address:</strong> {selectedDelivery.address}</p>
          <p><strong>Status:</strong> {selectedDelivery.status}</p>
        </section>
      )}
    </div>
  );
}

export default DeliveryManagement;