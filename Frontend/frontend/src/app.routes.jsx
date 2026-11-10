import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/auth/interview/pages/Home";
import Interview from "./features/auth/interview/pages/interview";
import Protected from "./features/auth/component/Protected";



export const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login />
    },
    { 
        path: "/register",
        element:<Register />
    },
    {
        path:"/",
        element:<Protected><Home /></Protected>
    },
    {
        path:"/interview",
        element:<Protected><Interview /></Protected>
    }
])