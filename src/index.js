import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ListCreate from "./components/ListCreate";
import Detail from "./components/Detail";
import ListEdit from "./components/ListEdit";
import List from "./components/List";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/detail/:id",
    element: <Detail></Detail>,
  },
  {
    path: "/create",
    element: <ListCreate></ListCreate>,
  },
  {
    path: "/edit/:id",
    element: <ListEdit></ListEdit>,
  },
  {
    path: "/list",
    element: <List></List>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
