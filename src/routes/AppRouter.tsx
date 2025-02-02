import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/NavBar.tsx";
import { ProductAdder } from "../pages/ProductAdder.tsx";
import { Toaster } from "sonner";

export function AppRouter() {
  return (
    <Router>
      <Toaster richColors closeButton position="top-right"></Toaster>
      <div className="min-h-screen ">
        <Navbar />
        <Suspense>
          <Routes>
            <Route path="/" element={<ProductAdder />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
