import React from "react";

import { Routes, Route } from "react-router-dom";
import Error from "../Error/Error";
import TopNav from "../Components/TopNav/TopNav";
import ProtectedRoutes from "../Auth/ProtectedRoute";
import GenerateRef from "./GenerateRef";
import "./home.css";
import ExistingRef from "./ExistingRef";

function Home() {
  return (
    <div className="home" style={{ padding: "0 20px" }}>
      <TopNav />
      <div className="remain-context">
        <Routes>
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/main" element={<GenerateRef />} />
            <Route path="/existingreferral" element={<ExistingRef />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
