// /*
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import ShopByCategory from "./components/ShopByCategory";
// import NewCollection from "./components/NewCollection";
// import WhyChooseUs from "./components/WhyChooseUs";
// import SeasonalBanner from "./components/SeasonalBanner";
// import TrendingNow from "./components/TrendingNow";
// import Newsletter from "./components/Newsletter";
// import Footer from "./components/Footer";

// function App() {
//   return (
//     <div className="page">
//       <Header />
//       <Hero />
//       <ShopByCategory />
//       <NewCollection />
//       <WhyChooseUs />
//       <SeasonalBanner />
//       <TrendingNow />
//       <Newsletter />
//       <Footer />
//     </div>
//   );
// }

// export default App;
// */

// import "../style/admin.css";
// import "../style/customer.css";
// import "../style/delivery.css";
// import Checkout from "./coustmer/Checkout";
// import CustomerLogin from "./coustmer/CustomerLogin";
// import OrderForm from "./coustmer/OrderForm";
// import ProductSearch from "./coustmer/productserach";
// import Registration from "./coustmer/Registration";
// import AdminDashboard from "./admin/adminDashboard";
// import AdminLogin from "./admin/adminlogin";
// import CategoryCRUD from "./admin/categorycrud";
// import DeliveryManagement from "./admin/DeliveryManagement";
// import OrderManagement from "./admin/OrderManagement";
// import ProductCRUD from "./admin/productcrud";
// import DeliveryAssignment from "./deliveryperson/DeliveryAssignment";
// import DeliveryConfirmation from "./deliveryperson/DeliveryConfirmation";
// import DeliveryLogin from "./deliveryperson/DeliveryLogin";
// import DeliveryRegistration from "./deliveryperson/DeliveryRegistration";
// import DeliveryStatus from "./deliveryperson/DeliveryStatus";

// function App() {
//   return (
//     <main className="forms-page">
//       <section className="customer-container">
//         <h1>Customer</h1>
//         <CustomerLogin />
//         <Registration />
//         <ProductSearch />
//         <OrderForm />
//         <Checkout />
//       </section>

//       <section className="delivery-container">
//         <h1>Delivery Person</h1>
//         <DeliveryLogin />
//         <DeliveryRegistration />
//         <DeliveryAssignment />
//         <DeliveryStatus />
//         <DeliveryConfirmation />
//       </section>

//       <section className="admin-container">
//         <h1>Admin</h1>
//         <AdminLogin />
//         <AdminDashboard />
//         <ProductCRUD />
//         <CategoryCRUD />
//         <OrderManagement />
//         <DeliveryManagement />
//       </section>
//     </main>
//   );
// }

//  export default App;
import "../style/admin.css";
import "../style/customer.css";
import "../style/delivery.css";
import Dashboard from "./components/dashboard/Dashboard";

 function App() {
   return <Dashboard />;
}

 export default App;