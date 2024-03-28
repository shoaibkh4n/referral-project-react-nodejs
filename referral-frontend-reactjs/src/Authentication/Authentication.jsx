import React from "react";
import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Error from "../Error/Error";
import PublicRoutes from "../Auth/PublicRoute";
// Only Login is implemented, you can create the register, forgot ,etc by following this flow and structure
// import Activation from "./Activation/Activation";
// import ResetPassword from "./ResetPassword/ResetPassword";
// import Register from "./Register/Register";
// import ForgotPassword from "./ForgotPassword/ForgotPassword";

function Authentication() {
  return (
    <>
      <div className="Auth-main">
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="login" element={<Login />} />

            {/* <Route path="register" element={<Register />} />
          <Route path="resetpassword" element={<ForgotPassword />} />
          <Route path="activation/:token" element={<Activation />} />
          <Route path="resetpassword/:token" element={<ResetPassword />} /> */}
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default Authentication;
