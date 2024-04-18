import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store, { persistor } from "./store";

import "./index.css";
import ErrorPage from "./pages/error-page.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/registration.jsx";
import Dashboard from "./pages/dashboard.jsx";
import BookingPage from "./pages/bookMeetingRoom.jsx";
import AddCampus from "./pages/addCampus.jsx";
import Calendar from "./pages/calendar.jsx";


import AddRooms from "./pages/addRoomsInformation.jsx";
import SendInvite from "./components/Invite.jsx";
import RoomData from "./components/roomData.jsx";

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
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/booking",
    element: <BookingPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "roomdata",
        element: <RoomData />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/addcampus",
    element: <AddCampus />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/addRooms",
    element: <AddRooms />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  // Use createRoot from react-dom/client
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

