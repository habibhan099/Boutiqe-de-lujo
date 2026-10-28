
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import route files
const adminRoutes = require("./router/adminRoutes");
const categoryRoutes = require("./router/categoryRoutes");
const checkoutRoutes = require("./router/checkoutRoutes");
const customerLoginRoutes = require("./router/customerLoginRoutes");
const customerManagementRoutes = require("./router/customerManagementRoutes");
const customerRoutes = require("./router/customerRoutes");
const deliveryConfirmationRoutes = require("./router/deliveryConfirmationRoutes");
const deliveryLoginRoutes = require("./router/deliveryLoginRoutes");
const deliveryManagementRoutes = require("./router/deliveryManagementRoutes");
const deliveryRegistrationRoutes = require("./router/deliveryRegistrationRoutes");
const deliveryStatusRoutes = require("./router/deliveryStatusRoutes");
const newsletterRoutes = require("./router/newsletterRoutes");
const orderFormRoutes = require("./router/orderFormRoutes");
const orderManagementRoutes = require("./router/orderManagementRoutes");
const orderRoutes = require("./router/orderRoutes");
const productCrudRoutes = require("./router/productCrudRoutes");
const productRoutes = require("./router/productRoutes");
const productSearchRoutes = require("./router/productSearchRoutes");

// Connect route files
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use("/api/customers/login", customerLoginRoutes);
app.use("/api/customers", customerManagementRoutes);
app.use("/api/customers", customerRoutes);

app.use("/api/deliveries", deliveryConfirmationRoutes);
app.use("/api/deliveries/login", deliveryLoginRoutes);
app.use("/api/deliveries", deliveryRegistrationRoutes);
app.use("/api/deliveries/status", deliveryStatusRoutes);
app.use("/api/deliveries", deliveryManagementRoutes);

app.use("/api/newsletter", newsletterRoutes);

app.use("/api/orders", orderManagementRoutes);
app.use("/api/orders", orderFormRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/products/search", productSearchRoutes);
app.use("/api/products", productCrudRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Boutique de Lujo Backend is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });
