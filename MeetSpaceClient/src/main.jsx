import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import ErrorPage from "./pages/error-page.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/registration.jsx";
import Dashboard from "./pages/dashboard.jsx";
import SendInvite from "./components/Invite.jsx";
import BookingSpace from "./pages/bookingpage.jsx";
import AddOwner from "./pages/addOwner.jsx";
import AddCampus from "./pages/addCampus.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration/:token",
    element: <Registration />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "send-invite",
        element: <SendInvite />,
      },
    ],
  },
  {
    path: "/booking",
    element: <BookingSpace />,
  },
  {
    path: "/addOwner",
    element: <AddOwner />,
  },
  {
    path: "/addcampus",
    element: <AddCampus />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
