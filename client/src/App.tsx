import { useState } from "react"
import Navbar from "./components/Navbar"
import { Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Cars from "./pages/Cars"
import MyBooking from "./pages/MyBooking"
import CarDetails from "./pages/CarDetails"
import Footer from "./components/Footer"
import Layout from "./pages/owner/Layout"
import Dashboards from "./pages/owner/Dashboards"
import AddCar from "./pages/owner/AddCar"
import ManageCar from "./pages/owner/ManageCar"
import ManageBooking from "./pages/owner/ManageBooking"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import VerifyOtp from "./components/VerifyOtp"
import ForgetPassword from "./components/ForgetPassword"
import NotFound from "./components/NotFound"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./components/ResentPassword"
import GoogleSuccess from "./pages/GoogleSuccess"
import GoogleError from "./pages/GoogleError"



function App ()
{
  const [ showLogin, setShowLogin ] = useState( false )
  const [ showSignup, setShowSignup ] = useState( false )

  const isOwnerPath = useLocation().pathname.startsWith( '/owner' )
  const isOtpPath = useLocation().pathname.startsWith( '/verify-otp' )
  const isForgetPassPath = useLocation().pathname.startsWith( '/forget-password' )
  const isNotFoundPath = ![
    "/",
    "/cars",
    "/my-bookings",
    "/car-details/: id",
    "/owner/",
    "/owner/add-car",
    "/owner/manage-cars",
    "/owner/manage-bookings",
    "/forget-password",
    "/verify-otp"
  ].includes( location.pathname );
  return (
    <>
      <Toaster />
      { showLogin && <Login setShowLogin={ setShowLogin } setShowSignup={ setShowSignup } /> }
      { showSignup && <SignUp setShowLogin={ setShowLogin } setShowSignup={ setShowSignup } /> }

      {
        !isOwnerPath && !isOtpPath && !isForgetPassPath && !isNotFoundPath && <Navbar setShowLogin={ setShowLogin } />
      }
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/car-details/:id" element={ <CarDetails /> } />
        <Route path="/cars" element={ <Cars /> } />
        <Route path="/my-bookings" element={ <MyBooking /> } />
        <Route path="/owner" element={ <Layout /> }>
          <Route index element={ <Dashboards /> } />
          <Route path="add-car" element={ <AddCar /> } />
          <Route path="manage-cars" element={ <ManageCar /> } />
          <Route path="manage-bookings" element={ <ManageBooking /> } />
        </Route>
        <Route path="/auth/google/success" element={ <GoogleSuccess /> } />
        <Route path="/auth/google/error" element={ <GoogleError /> } />
        <Route path="/forget-password" element={ <ForgetPassword setShowSignup={ setShowSignup } /> } />
        <Route path="/reset-password" element={ <ResetPassword setShowLogin={ setShowLogin } /> } />
        <Route path="/verify-otp" element={ <VerifyOtp  /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      {
        !isOwnerPath && !isOtpPath && !isForgetPassPath && !isNotFoundPath && <Footer />
      }
    </>
  )
}

export default App


