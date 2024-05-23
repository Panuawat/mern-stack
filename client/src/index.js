import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Form from "./components/Form";
import SingleComponent from "./components/SingleComponent";
import EditForm from "./components/EditForm";
import Login from "./components/Login";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: (
      <AdminRoute>
        <Form />
      </AdminRoute>
    ),
  },
  {
    path: "/blog/:slug",
    element: <SingleComponent />,
  },
  {
    path: "/blog/edit/:slug",
    element: (
      <AdminRoute>
        <EditForm />
      </AdminRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
