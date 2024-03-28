import React, { useState } from "react";
import Loader from "../Components/Loader/Loader";
import { postApi } from "../util/api";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

function GenerateRef() {
  const [loader, setLoader] = useState(false);
  const [referral, setReferral] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isCopy, setIsCopy] = useState(false);
  const navigate = useNavigate();

  const createReferral = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const resp = await postApi("/create_referral", referral);
      const reqData = await resp.json();
      if (resp.ok) {
        setError("✔ Successfully Generated");
        console.log(reqData?.message);
        setReferralCode(reqData?.code);
      } else if (resp.status === 400) {
        setError(reqData?.message);
        setReferralCode(reqData?.code);
      } else if (resp.status === 401) {
        setLoader(true);
        setError(
          `Your session is expired, you'll be logout and redirected to login in 3 second!! `
        );
        localStorage.clear();
        setTimeout(() => {
          navigate("/Authentication/login");
        }, 2000);
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
        <form onSubmit={createReferral}>
          <h1 style={{ marginTop: "-35px" }}>Referral Generator</h1>

          <span style={{ marginTop: "-45px" }}>
            Enter the following details to generate referral{" "}
          </span>
          <div
            className="input-wrapper"
            style={{ marginBottom: "-40px", marginTop: "-15px" }}
          >
            <input
              onChange={(e) =>
                setReferral({ ...referral, name: e.target.value })
              }
              value={referral.Name}
              type="text"
              required
              placeholder="Enter name"
            />
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) =>
                setReferral({ ...referral, email: e.target.value })
              }
              value={referral.email}
              required
              type="email"
              placeholder="Enter email address"
            />
          </div>

          {referralCode?.length > 0 && (
            <div className="referral-bar">
              <span> {referralCode} </span>{" "}
              {isCopy ? (
                <>✔</>
              ) : (
                <HiOutlineClipboardCopy
                  title="copy"
                  onClick={() => copyReferral(referralCode, setIsCopy)}
                />
              )}
            </div>
          )}

          {error?.length > 0 && (
            <span
              style={{
                marginTop: "-25px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {error}
            </span>
          )}

          {loader ? <Loader /> : <button>Generate</button>}
        </form>
      </div>
    </div>
  );
}

export default GenerateRef;
export const copyReferral = (text, setIsCopy) => {
  window.navigator.clipboard.writeText(text).then((e) => {
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  });
};
