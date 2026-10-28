import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myFormSubmissionFunction as logFormSubmission } from "../utils/formSubmission";
import { orderFormAxiosFunction } from "../Service/api";

const orderSchema = z.object({
  productName: z.string().trim().min(2, "Enter a product name."),
  size: z.string().min(1, "Select a size."),
  color: z.string().trim().min(2, "Enter a color."),
  quantity: z.coerce.number().int().min(1, "Quantity must be at least 1."),
  name: z.string().trim().min(2, "Enter your full name."),
  phone: z.string().trim().regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number."),
  address: z.string().trim().min(5, "Enter your delivery address."),
});

function OrderForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data) => {
    logFormSubmission(data);
    await orderFormAxiosFunction(data);
    reset();
  };

  return (
    <div>
      <h1>Place Your Order</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          <label>Size</label>
          <br />
          <select defaultValue="" {...register("size")}>
            <option value="" disabled>Select Size</option>
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
          {errors.size && <p role="alert">{errors.size.message}</p>}
        </div>

        <br />

        <div>
          <label>Color</label>
          <br />
          <input
            type="text"
            placeholder="Enter color"
            {...register("color")}
          />
          {errors.color && <p role="alert">{errors.color.message}</p>}
        </div>

        <br />

        <div>
          <label>Quantity</label>
          <br />
          <input
            type="number"
            placeholder="Enter quantity"
            min="1"
            {...register("quantity")}
          />
          {errors.quantity && <p role="alert">{errors.quantity.message}</p>}
        </div>

        <br />

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
            placeholder="Enter complete delivery address"
            {...register("address")}
          ></textarea>
          {errors.address && <p role="alert">{errors.address.message}</p>}
        </div>

        <br />

        <button type="submit">Place Order</button>
      
        <nav className="form-links" aria-label="Related pages">
          <Link to="/product-search">Back to products</Link>
          <Link to="/checkout">Continue to checkout</Link>
          <Link to="/">Home</Link>
        </nav>
      </form>
    </div>
  );
}

export default OrderForm;