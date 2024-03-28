import React from "react";
import Missing from "../Assets/404.png";

function Error() {
  return (
    <div className="not-found">
      <img src={Missing} alt="404-Notfound" />
    </div>
  );
}

export default Error;
