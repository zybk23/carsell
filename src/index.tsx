import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import ProductDetails from "./screens/product-details/routes";
import Products from "./screens/products/routes";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./shared/navigation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/details/:id" element={<ProductDetails />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
