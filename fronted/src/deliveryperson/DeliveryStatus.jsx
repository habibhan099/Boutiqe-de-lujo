import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { deliveryStatusAxiosFunction } from "../Service/api";

const deliveryStatusSchema = z.object({
  orderId: z.string().trim().min(1, "Enter an order ID."),
  customerName: z.string().trim().min(2, "Enter the customer's name."),
  status: z.string().min(1, "Select a delivery status."),
});

function DeliveryStatus() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(deliveryStatusSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await deliveryStatusAxiosFunction(data);
  }

  return (
    <div>
      <h1>Delivery Status</h1>

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
            placeholder="Customer name"
            {...register("customerName")}
          />
          {errors.customerName && <p role="alert">{errors.customerName.message}</p>}
        </div>

        <br />

        <div>
          <label>Delivery Status</label>
          <br />
          <select {...register("status")}>
            <option>Assigned</option>
            <option>Picked Up</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Failed</option>
          </select>
          {errors.status && <p role="alert">{errors.status.message}</p>}
        </div>

        <br />

        <div>
          <label>Delivery Notes</label>
          <br />
          <textarea
            placeholder="Enter delivery notes"
            {...register("notes")}
          ></textarea>
        </div>

        <br />

        <button type="submit">Update Status</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/assignment">View assignments</Link>
          <Link to="/confirmation">Confirm delivery</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default DeliveryStatus;