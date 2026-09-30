import { useState } from "react";
import "./Dashbord.css";
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

const formGroups = [
  {
    id: "admin",
    label: "Admin",
    containerClass: "admin-container",
    forms: [
      { id: "admin-login", label: "Admin Login", component: AdminLogin },
      { id: "admin-dashboard", label: "Admin Dashboard", component: AdminDashboard },
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

function Dashboard() {
  const [expandedGroup, setExpandedGroup] = useState("admin");
  const [activeFormId, setActiveFormId] = useState(null);
  const selectedForm = formGroups
    .flatMap((group) => group.forms)
    .find((form) => form.id === activeFormId);
  const selectedGroup = formGroups.find((group) => group.id === expandedGroup);
  const ActiveForm = selectedForm?.component;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <nav className="sidebar-nav" aria-label="Dashboard forms">
          {formGroups.map((group) => {
            const isExpanded = expandedGroup === group.id;

            return (
              <div className="sidebar-group" key={group.id}>
                <button
                  className="sidebar-section-trigger"
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => {
                    setExpandedGroup(isExpanded ? null : group.id);
                    setActiveFormId(null);
                  }}
                >
                  {group.label}
                  <span className="section-indicator" aria-hidden="true">
                    {isExpanded ? "−" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="sidebar-submenu">
                    {group.forms.map((form) => (
                      <button
                        className="sidebar-form"
                        type="button"
                        key={form.id}
                        aria-current={activeFormId === form.id ? "page" : undefined}
                        onClick={() => setActiveFormId(form.id)}
                      >
                        {form.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>{selectedGroup?.label ?? "Dashboard"}</h1>
        </header>
        <div className="content">
          <section className={`selected-form ${selectedGroup?.containerClass ?? ""}`}>
            {ActiveForm && <ActiveForm />}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;