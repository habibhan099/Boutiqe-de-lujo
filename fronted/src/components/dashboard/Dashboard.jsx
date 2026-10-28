import { Link, NavLink } from "react-router-dom";
import "./Dashbord.css";
import CustomerManagement from "../CustomerManagement";
import AdminDashboard from "../../admin/adminDashboard";
import AdminLogin from "../../admin/adminlogin";
import CategoryCRUD from "../../admin/categorycrud";
import DeliveryManagement from "../../admin/DeliveryManagement";
import OrderManagement from "../../admin/OrderManagement";
import ProductCRUD from "../../admin/productcrud";
import Checkout from "../../coustmer/Checkout";
import CustomerLogin from "../../coustmer/CustomerLogin";
import OrderForm from "../../coustmer/OrderForm";
import ProductSearch from "../../coustmer/productserach";
import Registration from "../../coustmer/Registration";
import DeliveryAssignment from "../../deliveryperson/DeliveryAssignment";
import DeliveryConfirmation from "../../deliveryperson/DeliveryConfirmation";
import DeliveryLogin from "../../deliveryperson/DeliveryLogin";
import DeliveryRegistration from "../../deliveryperson/DeliveryRegistration";
import DeliveryStatus from "../../deliveryperson/DeliveryStatus";

export const formGroups = [
  {
    id: "admin",
    label: "Admin",
    containerClass: "admin-container",
    forms: [
      { id: "admin-login", label: "Admin Login", component: AdminLogin },
      { id: "admin-dashboard", label: "Admin Dashboard", component: AdminDashboard },
      { id: "customers", label: "Customer Management", component: CustomerManagement },
      { id: "products", label: "Product Management", component: ProductCRUD },
      { id: "categories", label: "Category Management", component: CategoryCRUD },
      { id: "orders", label: "Order Management", component: OrderManagement },
      { id: "deliveries", label: "Delivery Management", component: DeliveryManagement },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    containerClass: "customer-container",
    forms: [
      { id: "customer-login", label: "Customer Login", component: CustomerLogin },
      { id: "registration", label: "Registration", component: Registration },
      { id: "product-search", label: "Product Search", component: ProductSearch },
      { id: "order-form", label: "Order Form", component: OrderForm },
      { id: "checkout", label: "Checkout", component: Checkout },
    ],
  },
  {
    id: "delivery",
    label: "Delivery Person",
    containerClass: "delivery-container",
    forms: [
      { id: "delivery-login", label: "Delivery Login", component: DeliveryLogin },
      { id: "delivery-registration", label: "Registration", component: DeliveryRegistration },
      { id: "assignment", label: "Delivery Assignment", component: DeliveryAssignment },
      { id: "delivery-status", label: "Delivery Status", component: DeliveryStatus },
      { id: "confirmation", label: "Delivery Confirmation", component: DeliveryConfirmation },
    ],
  },
];

function Dashboard({ groupId, formId }) {
  const selectedGroup = formGroups.find(group => group.id === groupId);
  const selectedForm = selectedGroup?.forms.find(form => form.id === formId);
  const ActiveForm = selectedForm?.component;
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <Link to="/">Home</Link>
        <nav className="sidebar-nav" aria-label="Dashboard forms">
          {formGroups.map(group => (
            <div className="sidebar-group" key={group.id}>
              <NavLink className="sidebar-section-trigger" to={`/${group.id}`}>{group.label}</NavLink>
              {group.id === groupId && <div className="sidebar-submenu">
                {group.forms.map(form => <NavLink className="sidebar-form" key={form.id} to={`/${form.id}`}>{form.label}</NavLink>)}
              </div>}
            </div>
          ))}
        </nav>
      </aside>
      <main className="dashboard-main">
        <header className="dashboard-header"><h1>{selectedGroup?.label ?? "Dashboard"}</h1></header>
        <div className="content"><section className={`selected-form ${selectedGroup?.containerClass ?? ""}`}>
          {ActiveForm ? <ActiveForm /> : <p>Select a form from the navigation.</p>}
        </section></div>
      </main>
    </div>
  );
}
export default Dashboard;
