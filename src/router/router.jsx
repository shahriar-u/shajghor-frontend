/** @format */

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound/NotFound";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardInfo from "../Pages/Dashboard/DashboardInfo/DashboardInfo";
import About from "../Pages/About/About";
import Contact from "../Pages/Contact/Contact";
import Services from "../Pages/Services/Services";
import ServiceDetails from "../Pages/ServiceDetails/ServiceDetails";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
// import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";

import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import AddService from "../Pages/Dashboard/AddService/AddService";

import EditService from "../Pages/Dashboard/EditService/EditService";
import AllServices from "../Pages/Dashboard/AllServices/AllServices";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AccountInformation from "../Pages/AccountInformation/AccountInformation";
import MyAssignedServices from "../Pages/Dashboard/MyAssignedServices/MyAssignedServices";
import TodaysSchedule from "../Pages/Dashboard/TodaysSchedule/TodaysSchedule";
import EarningsSummary from "../Pages/Dashboard/EarningsSummary/EarningsSummary";

import AdminRevenue from "../Pages/Dashboard/RevenuMonitoring/RevenuMonitoring";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess/PaymentSuccess";
import AdminRoute from "./AdminRoute";
import DecoratorRoute from "./DecoratorRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/account-information",
        element: <AccountInformation />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <MyProfile />,
          },
          // {
          //   path: "/dashboard",
          //   element: <DashboardInfo />,
          // },
          {
            path: "/dashboard/payment-success/:id",
            element: <PaymentSuccess />,
          },
          
          // {
          //   path: "/dashboard/my-orders",
          //   element: <MyOrders />,
          // },
          {
            path: "/dashboard/my-booking",
            element: <MyBookings />,
          },
          {
            path: "/dashboard/payment-history",
            element: <PaymentHistory />,
          },
          {
            path: "/dashboard/payment-history",
            element: <PaymentHistory />,
          },
          // admin route
          {
            path: "/dashboard/manage-users",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/services",
            element: (
              <AdminRoute>
                <AllServices />
              </AdminRoute>
            ),
          },

          {
            path: "/dashboard/edit-service/:id",
            element: (
              <AdminRoute>
                {" "}
                <EditService />
              </AdminRoute>
            ),
            loader: ({ params }) =>
              fetch(`http://localhost:5000/service/${params.id}`),
          },

          {
            path: "/dashboard/manage-bookings",
            element: (
              <AdminRoute>
                {" "}
                <ManageBookings />
              </AdminRoute>
            ),
          },

          {
            path: "/dashboard/revenue-monitoring",
            element: (
              <AdminRoute>
                {" "}
                <AdminRevenue />
              </AdminRoute>
            ),
          },
          {
            path: "/dashboard/add-service",
            element: (
              <AdminRoute>
                {" "}
                <AddService />{" "}
              </AdminRoute>
            ),
          },

          // decoretors
          {
            path: "/dashboard/my-assigned-services",
            element: (
              <DecoratorRoute>
                <MyAssignedServices />
              </DecoratorRoute>
            ),
          },
          {
            path: "/dashboard/today-schedule",
            element: (
              <DecoratorRoute>
                {" "}
                <TodaysSchedule />
              </DecoratorRoute>
            ),
          },
          {
            path: "/dashboard/earning-summary",
            element: (
              <DecoratorRoute>
                {" "}
                <EarningsSummary />
              </DecoratorRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
