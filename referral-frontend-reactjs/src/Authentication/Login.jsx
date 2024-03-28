import React, { useState } from "react";
import Logo from "../Assets/logo.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { postWithoutToken } from "../util/api";
import Loader from "../Components/Loader/Loader";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [loginCred, setLoginCred] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const reverseVisible = () => {
    setIsVisible((prev) => !prev);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const resp = await postWithoutToken("/login", loginCred);
      const reqData = await resp.json();
      if (resp.ok) {
        localStorage.setItem("token", reqData?.token);
        navigate("/main");
      } else {
        setError(reqData?.message);
      }
    } catch (error) {
      setError(`Something went wrong: ${error}`);
    }
    setLoader(false);
  };

  return (
    <div className="container" id="container">
      <div className="form sign_in">
        <form onSubmit={login}>
          <img src={Logo} alt="logo" style={{ marginTop: "-10px" }} />
          <h1 style={{ marginTop: "-35px" }}>Login In</h1>

          <span style={{ marginTop: "-45px" }}>Login In with your Account</span>
          <div
            className="input-wrapper"
            style={{ marginBottom: "-40px", marginTop: "-15px" }}
          >
            <input
              onChange={(e) =>
                setLoginCred({ ...loginCred, email: e.target.value })
              }
              value={loginCred.email}
              required
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="input-wrapper">
            <input
              onChange={(e) =>
                setLoginCred({ ...loginCred, password: e.target.value })
              }
              value={loginCred.password}
              required
              type={isVisible ? "text" : "password"}
              placeholder="Password"
            />
            {isVisible ? (
              <AiOutlineEyeInvisible onClick={reverseVisible} />
            ) : (
              <AiOutlineEye onClick={reverseVisible} />
            )}
          </div>
          {error?.length > 0 && (
            <span style={{ marginTop: "-25px" }}>{error}</span>
          )}

          {loader ? <Loader /> : <button>Login</button>}
        </form>
      </div>
    </div>
  );
}

export default Login;
