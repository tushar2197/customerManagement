import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CustomerProvider } from "./context/CustomerContext";
import FullPageLoader from "./components/FullPageLoader";

const CustomerListPage = React.lazy(() => import("./pages/CustomerListPage"));
const AddEditCustomerPage = React.lazy(() =>
  import("./pages/AddEditCustomerPage")
);

const App = () => {
  return (
    <CustomerProvider>
      <Router>
        <Suspense fallback={<FullPageLoader loading={true} />}>
          <Routes>
            {/* Default route */}
            <Route path="/" element={<Navigate to="/customer" />} />

            {/* Lazy-loaded routes */}
            <Route path="/customer" element={<CustomerListPage />} />
            <Route path="/customer/add" element={<AddEditCustomerPage />} />
            <Route
              path="/customer/edit/:id"
              element={<AddEditCustomerPage />}
            />
          </Routes>
        </Suspense>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </CustomerProvider>
  );
};

export default App;
