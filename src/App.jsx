import { NavBar } from "./components/shared/NavBar";
import { CustomerManagement } from "./pages/CustomerManagement";
import { Login } from "./pages/Login";
import { ProductManagement } from "./pages/ProductManagement";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Transaction } from "./pages/Transaction";
import { Home } from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import isTokenValid from "./utils/isTokenValid";
import { Spinner } from "@nextui-org/react";
import { Register } from "./pages/Register";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && isTokenValid(token)) {
      setIsLoggedIn(true);
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    return <Spinner className=" flex justify-center items-center h-screen" />;
  }

  return (
    <>
      <Routes>
        <Route
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
          path="/login"
        />
        <Route element={<Register />} path="/register" />
        <Route
          element={
            isLoggedIn ? (
              <>
                <NavBar />
                <Outlet />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route element={<Home />} path="/" />
          <Route element={<ProductManagement />} path="/produk" />
          <Route element={<CustomerManagement />} path="/customer" />
          <Route element={<Transaction />} path="/transaksi" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
