
import axios from "axios";

const API_URL = "http://localhost:3000";

// Convert data to FormData for image upload
function withImageFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (["id", "image", "formData"].includes(key)) return;

    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const image = data.image?.[0] || data.image;

  if (image instanceof File) {
    formData.append("image", image);
  }

  return formData;
}

// ==================== ADMIN ====================

export async function adminLoginAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/admin/login`, data);
}

// ==================== CATEGORY CRUD ====================

// Add or update category
export async function categoryCrudAxiosFunction(data) {
  return await axios.request({
    url: data.id
      ? `${API_URL}/api/categories/${encodeURIComponent(data.id)}`
      : `${API_URL}/api/categories`,
    method: data.id ? "put" : "post",
    data: withImageFormData(data),
  });
}

// Get all categories
export async function getCategoriesAxiosFunction() {
  return await axios.get(`${API_URL}/api/categories`);
}

// Delete category
export async function deleteCategoryAxiosFunction(id) {
  return await axios.delete(
    `${API_URL}/api/categories/${encodeURIComponent(id)}`
  );
}

// ==================== PRODUCT CRUD ====================

// Add or update product
export async function productCrudAxiosFunction(data) {
  return await axios.request({
    url: data.id
      ? `${API_URL}/api/products/${encodeURIComponent(data.id)}`
      : `${API_URL}/api/products`,
    method: data.id ? "put" : "post",
    data: withImageFormData(data),
  });
}

// Get all products
export async function getProductsAxiosFunction() {
  return await axios.get(`${API_URL}/api/products`);
}

// Delete product
export async function deleteProductAxiosFunction(id) {
  return await axios.delete(
    `${API_URL}/api/products/${encodeURIComponent(id)}`
  );
}

// ==================== ORDER MANAGEMENT ====================

export async function orderManagementAxiosFunction(data) {
  return await axios.request({
    url: data.id
      ? `${API_URL}/api/orders/${encodeURIComponent(data.id)}`
      : `${API_URL}/api/orders/management`,
    method: data.id ? "put" : "post",
    data,
  });
}

export async function getOrdersAxiosFunction() {
  return await axios.get(`${API_URL}/api/orders`);
}

export async function deleteOrderAxiosFunction(id) {
  return await axios.delete(`${API_URL}/api/orders/${encodeURIComponent(id)}`);
}

// Create order
export async function orderFormAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/orders`, data);
}

// ==================== DELIVERY MANAGEMENT ====================

export async function deliveryManagementAxiosFunction(data) {
  return await axios.request({
    url: data.id
      ? `${API_URL}/api/deliveries/${encodeURIComponent(data.id)}`
      : `${API_URL}/api/deliveries`,
    method: data.id ? "put" : "post",
    data,
  });
}

export async function getDeliveriesAxiosFunction() {
  return await axios.get(`${API_URL}/api/deliveries`);
}

export async function deleteDeliveryAxiosFunction(id) {
  return await axios.delete(`${API_URL}/api/deliveries/${encodeURIComponent(id)}`);
}

export async function deliveryConfirmationAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/deliveries/confirm`, data);
}

export async function deliveryLoginAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/deliveries/login`, data);
}

export async function deliveryRegistrationAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/deliveries/register`, data);
}

export async function deliveryStatusAxiosFunction(data) {
  return await axios.patch(`${API_URL}/api/deliveries/status`, data);
}

// ==================== CUSTOMER MANAGEMENT ====================

export async function customerManagementAxiosFunction(data) {
  return await axios.request({
    url: data.id
      ? `${API_URL}/api/customers/${encodeURIComponent(data.id)}`
      : `${API_URL}/api/customers`,
    method: data.id ? "put" : "post",
    data,
  });
}

export async function getCustomersAxiosFunction() {
  return await axios.get(`${API_URL}/api/customers`);
}

export async function deleteCustomerAxiosFunction(id) {
  return await axios.delete(`${API_URL}/api/customers/${encodeURIComponent(id)}`);
}

export async function customerRegistrationAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/customers/register`, data);
}

export async function customerLoginAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/customers/login`, data);
}

// ==================== CHECKOUT ====================

export async function checkoutAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/checkout`, data);
}

// ==================== PRODUCT SEARCH ====================

export async function productSearchAxiosFunction(data) {
  return await axios.get(`${API_URL}/api/products/search`, {
    params: data,
  });
}

// ==================== NEWSLETTER ====================

export async function newsletterAxiosFunction(data) {
  return await axios.post(`${API_URL}/api/newsletter`, data);
}
