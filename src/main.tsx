import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/index.ts";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import router from "./pages/route.tsx";
import 'react-toastify/dist/ReactToastify.css';
  
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        autoClose={3000}
        toastClassName={"shadow-lg"}
        progressClassName={`bg-indigo-600`}
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
