import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button onClick={logout} style={{ width: "100px" }}>
      Logout
    </button>
  );
}

export default Logout;
