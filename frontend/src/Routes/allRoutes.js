import React from "react";
import { Navigate } from "react-router-dom";

// Auth
import Login from "pages/Authentication/Login";
import ForgetPasswordPage from "pages/Authentication/ForgetPassword";
import Logout from "pages/Authentication/Logout";
import Register from "pages/Authentication/Register";

// User profile
import UserProfile from "pages/Authentication/Profile/ViewProfile";
import ProfileEdit from "pages/Authentication/Profile/EditProfile";
// user edit profile

//Dashboard
import Dashboard from "pages/Dashboard";

// ADMIN PAGES
import Groups from "pages/Admin/Settings/Groups";
// import UserList from "pages/Users/UserList";
import Attendance from "pages/Attendance";



// Public Pages
import Public from "pages/Public";
import About from "pages/Public/About";
import Contact from "pages/Public/Contact";





// //AuthenticationInner pages
import CoverSignIn from "pages/AuthenticationInner/Login/CoverSignIn";
import BasicSignUp from "pages/AuthenticationInner/Register/BasicSignUp";
import CoverSignUp from "pages/AuthenticationInner/Register/CoverSignUp";

import BasicPasswReset from "pages/AuthenticationInner/PasswordReset/BasicPasswReset";
import CoverPasswReset from "pages/AuthenticationInner/PasswordReset/CoverPasswReset";

import BasicLogout from "pages/AuthenticationInner/Logout/BasicLogout";
import CoverLogout from "pages/AuthenticationInner/Logout/CoverLogout";

import BasicSuccessMsg from "pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
import CoverSuccessMsg from "pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
import BasicTwosVerify from "pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
import CoverTwosVerify from "pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";

import Basic404 from "pages/AuthenticationInner/Errors/Basic404";
import Cover404 from "pages/AuthenticationInner/Errors/Cover404";
import Alt404 from "pages/AuthenticationInner/Errors/Alt404";
import Error500 from "pages/AuthenticationInner/Errors/Error500";

import BasicPasswCreate from "pages/AuthenticationInner/PasswordCreate/BasicPasswCreate";
import CoverPasswCreate from "pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";

import Offlinepage from "pages/AuthenticationInner/Errors/Offlinepage";


const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // ---------Admin---------
  // Admin Options
  { path: "/profile-edit", component: <ProfileEdit /> },
  { path: "/settings/groups", component: <Groups /> },

  // Admin Lists
  // { path: "/admin/users/", component: <UserList /> },


  //User Profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/profile-edit", component: <ProfileEdit /> },
  
  { path: "/attendance", component: <Attendance /> },


  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

];

// Public Routes
const publicRoutes = [
  // Authentication Pages
  { path: "/index", component: <Public /> },
  { path: "/about", component: <About /> },
  { path: "/contact", component: <Contact /> },
  


  // User Authentication
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },


  //AuthenticationInner pages
  // { path: "/auth-signin-basic", component: <BasicSignIn /> },
  { path: "/auth-404-basic", component: <Basic404 /> },
  { path: "/auth-404-cover", component: <Cover404 /> },
  { path: "/auth-404-alt", component: <Alt404 /> },
  { path: "/auth-500", component: <Error500 /> },

  { path: "/auth-pass-change-basic", component: <BasicPasswCreate /> },
  { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  { path: "/auth-offline", component: <Offlinepage /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/index" />,
  },
  {
    path: "*",
    component: <Navigate to="/index" />
  },

];

export { authProtectedRoutes, publicRoutes };
