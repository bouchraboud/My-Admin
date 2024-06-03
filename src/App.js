import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

import NoPage from "./pages/NoPage";
import ProductPage from "./pages/Product"; // Import fetchProducts and renderProducts functions
import RequestPage from "./pages/Requests";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="Home" element={<Home />} />
        <Route path="Requests" element={<RequestPage />} />
          <Route path="Product" element={<ProductPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

