import React, { useEffect, useState } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { deleteApi, getApi } from "../util/api";
import Loader from "../Components/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
function ExistingRef() {
  const [isCopy, setIsCopy] = useState(["false"]);
  const [referrals, setReferrals] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refDelete, setRefDelete] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const getReferrals = async () => {
    setLoader(true);
    try {
      const resp = await getApi("/get_referrals");
      const data = await resp.json();
      if (resp.ok) {
        setReferrals(data?.referrals);

        setIsCopy((prev) => {
          prev.length = data?.referrals?.length;
          prev.fill(false);
          return prev;
        });
        setRefDelete((prev) => {
          prev.length = data?.referrals?.length;
          prev.fill(false);
          return prev;
        });
      } else {
        setMessage(data?.message);
      }
    } catch (error) {
      setMessage("Something went wrong:" + error);
    }
    setLoader(false);
  };
  const copyContent = (text, index) => {
    console.log(isCopy);
    window.navigator.clipboard.writeText(text).then((e) => {
      setIsCopy((prev) => {
        const copyState = [...prev];
        copyState[index] = true;
        return copyState;
      });
      setTimeout(() => {
        setIsCopy((prev) => {
          const copyState = [...prev];
          copyState[index] = false;
          return copyState;
        });
      }, 2000);
    });
  };

  const deleteRef = async (emails, index) => {
    setRefDelete((prev) => {
      const refdel = [...prev];
      refdel[index] = true;
      return refdel;
    });
    try {
      const resp = await deleteApi("/delete_referral", { email: emails });
      const data = await resp.json();
      if (resp.ok) {
        const updatedItems = referrals.filter((ref) => ref.email !== emails);
        setReferrals(updatedItems);
      } else if (resp.status === 401) {
        localStorage.clear();
        navigate("/");
        alert("Your session is expired, you're logged out !!!");
      } else {
        setMessage(data?.message);
        alert(data?.message);
      }

      setRefDelete((prev) => {
        const refdel = [...prev];
        refdel[index] = false;
        return refdel;
      });
    } catch (error) {
      setMessage("Something went wrong: " + error);
      setRefDelete((prev) => {
        const refdel = [...prev];
        refdel[index] = false;
        return refdel;
      });
    }
  };

  useEffect(() => {
    console.log("hi");
    getReferrals();
  }, []);

  return (
    <div
      style={{ width: "100vw", padding: "10px" }}
      className="container"
      id="container"
    >
      <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
        <Link to="/">
          {" "}
          <AiOutlineArrowLeft />{" "}
        </Link>{" "}
        Existing Referrals
      </h1>
      {message?.length > 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {message}
        </span>
      )}

      {referrals?.length === 0 && (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          No previous referrals found 🥴🥴!
        </span>
      )}

      {loader ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Loader />
        </div>
      ) : (
        <>
          {referrals?.map((ref, index) => {
            return (
              <div className="existing-ref-container" key={ref?.email}>
                <div className="ref-name">{ref?.name} </div>
                <div className="ref-email">{ref?.email}</div>
                <div
                  className="ref-code"
                  onClick={() => copyContent(ref?.referralCode, index)}
                >
                  {ref?.referralCode}
                  {isCopy[index] ? (
                    <span style={{ fontSize: "15px" }}>✔</span>
                  ) : (
                    <div>
                      <HiOutlineClipboardCopy />
                    </div>
                  )}
                </div>
                {refDelete[index] ? (
                  <div style={{ display: "grid", placeItems: "center" }}>
                    {" "}
                    <Loader />{" "}
                  </div>
                ) : (
                  <div
                    className="ref-delete"
                    onClick={() => deleteRef(ref?.email, index)}
                  >
                    Delete
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ExistingRef;
