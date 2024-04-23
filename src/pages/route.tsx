import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorPage from "./error";
import ProfilePage from "./profile";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import ProfileDetail from "./profile/detail";

type AuthRouteProps = {
  path: string;
  element: JSX.Element;
};

const isAuthenticated = (): boolean => {
  const userData = JSON.parse(localStorage.getItem('user-data')!);
  return !!userData;
};

const AuthRoute = ({ element, path }: AuthRouteProps) => {
  const authenticated = isAuthenticated();
  console.log('authenticated : ',authenticated)
  if (path === "/" && !authenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <AuthRoute element={<ProfilePage />} path="/" /> },
      { path:'profile/:id', element: <AuthRoute element={<ProfileDetail />} path="/" /> },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },      
      
    ],
  },
]);

export default router;
