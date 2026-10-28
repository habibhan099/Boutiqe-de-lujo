import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { deliveryConfirmationAxiosFunction } from "../Service/api";

const confirmationSchema = z.object({
  orderId: z.string().trim().min(1, "Enter an order ID."),
  customerName: z.string().trim().min(2, "Enter the customer's name."),
  deliveryDate: z.string().min(1, "Select the delivery date."),
  confirmation: z.string().min(1, "Select a confirmation status."),
});

function DeliveryConfirmation() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(confirmationSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await deliveryConfirmationAxiosFunction(data);
  }

  return (
    <div>
      <h1>Delivery Confirmation</h1>

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
          <label>Delivery Date</label>
          <br />
          <input type="date" {...register("deliveryDate")} />
          {errors.deliveryDate && <p role="alert">{errors.deliveryDate.message}</p>}
        </div>

        <br />

        <div>
          <label>Confirmation</label>
          <br />
          <select {...register("confirmation")}>
            <option>Delivered Successfully</option>
            <option>Customer Not Available</option>
            <option>Delivery Failed</option>
          </select>
          {errors.confirmation && <p role="alert">{errors.confirmation.message}</p>}
        </div>

        <br />

        <div>
          <label>Remarks</label>
          <br />
          <textarea
            placeholder="Enter remarks"
            {...register("remarks")}
          ></textarea>
        </div>

        <br />

        <button type="submit">Confirm Delivery</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/assignment">Back to assignments</Link>
          <Link to="/delivery-status">Delivery status</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default DeliveryConfirmation;