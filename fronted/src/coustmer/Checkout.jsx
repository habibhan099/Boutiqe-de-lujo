import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { checkoutAxiosFunction } from "../Service/api";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number."),
  address: z.string().trim().min(5, "Enter your delivery address."),
  paymentMethod: z.string().min(1, "Select a payment method."),
});

function Checkout() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  async function myFormSubmissionFunction(data) {
    logFormSubmission(data);
    await checkoutAxiosFunction(data);
  }

  return (
    <div>
      <h1>Checkout</h1>

      <h2>Order Summary</h2>

      <p>Product: Men T-Shirt</p>
      <p>Quantity: 2</p>
      <p>Price: Rs. 1500</p>
      <p>Delivery Charges: Rs. 200</p>

      <h3>Total: Rs. 3200</h3>

      <hr />

      <h2>Customer Information</h2>

      <form onSubmit={handleSubmit(myFormSubmissionFunction)} noValidate>
        <div>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          {errors.name && <p role="alert">{errors.name.message}</p>}
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
          <label>Delivery Address</label>
          <br />
          <textarea
            placeholder="Enter complete address"
            {...register("address")}
          ></textarea>
          {errors.address && <p role="alert">{errors.address.message}</p>}
        </div>

        <br />

        <div>
          <label>Payment Method</label>
          <br />

          <select {...register("paymentMethod")}>
            <option>Cash on Delivery</option>
            <option>Online Payment</option>
          </select>
          {errors.paymentMethod && <p role="alert">{errors.paymentMethod.message}</p>}
        </div>

        <br />

        <button type="submit">Confirm Order</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/order-form">Back to order</Link>
          <Link to="/product-search">Continue shopping</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default Checkout;