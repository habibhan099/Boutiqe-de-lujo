import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import {
  customerManagementAxiosFunction,
  deleteCustomerAxiosFunction,
  getCustomersAxiosFunction,
} from "../Service/api";

const customerSchema = z.object({
  customerId: z.string().trim().min(1, "Enter a customer ID."),
  name: z.string().trim().min(2, "Enter the customer's name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number."),
  address: z.string().trim().min(5, "Enter the customer's address."),
});

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(customerSchema),
  });

  async function loadCustomers() {
    setLoading(true);
    try {
      const response = await getCustomersAxiosFunction();
      setCustomers(response.data.customers);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    setSubmitting(true);
    setMessage("");
    try {
      await customerManagementAxiosFunction({ ...data, id: editingId });
      setMessage(editingId ? "Customer updated successfully." : "Customer added successfully.");
      reset();
      setEditingId(null);
      await loadCustomers();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  function editCustomer(customer) {
    setEditingId(customer._id);
    setSelectedCustomer(null);
    reset({
      customerId: customer.customerId || "",
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    reset();
  }

  async function deleteCustomer(id) {
    if (!window.confirm("Delete this customer?")) return;
    setSubmitting(true);
    setMessage("");
    try {
      await deleteCustomerAxiosFunction(id);
      setMessage("Customer deleted successfully.");
      if (editingId === id) cancelEdit();
      if (selectedCustomer?._id === id) setSelectedCustomer(null);
      await loadCustomers();
      window.dispatchEvent(new Event("boutique-data-changed"));
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>Customer Management</h1>

      <h2>{editingId ? "Edit Customer" : "Add Customer"}</h2>
      {message && <p role="status">{message}</p>}

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Customer ID</label>
          <br />
          <input
            type="text"
            placeholder="Enter customer ID"
            {...register("customerId")}
          />
          {errors.customerId && <p role="alert">{errors.customerId.message}</p>}
        </div>

        <br />
        <div>
          <label>Customer Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter customer name"
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
            placeholder="Enter customer email"
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
            placeholder="Enter customer address"
            {...register("address")}
          ></textarea>
          {errors.address && <p role="alert">{errors.address.message}</p>}
        </div>

        <br />

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : editingId ? "Update Customer" : "Add Customer"}
        </button>
        {editingId && (
          <>
            {" "}
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </>
        )}
      </form>

      <hr />

      <h2>Customer List</h2>

      {loading ? <p>Loading customers...</p> : (
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
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.customerId || customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button type="button" onClick={() => setSelectedCustomer(customer)}>View</button>{" "}
                <button type="button" onClick={() => editCustomer(customer)}>Edit</button>{" "}
                <button type="button" onClick={() => deleteCustomer(customer._id)} disabled={submitting}>Delete</button>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr><td colSpan="6">No customers found.</td></tr>
          )}
        </tbody>
      </table>
      )}

      {selectedCustomer && (
        <section>
          <h2>Customer Details</h2>
          <p><strong>ID:</strong> {selectedCustomer.customerId || selectedCustomer._id}</p>
          <p><strong>Name:</strong> {selectedCustomer.name}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
          <p><strong>Address:</strong> {selectedCustomer.address}</p>
        </section>
      )}
    </div>
  );
}

export default CustomerManagement;