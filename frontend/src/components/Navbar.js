// frontend/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ display:"flex", padding:"10px 20px", background:"#222", color:"#fff", justifyContent:"space-between" }}>
      <div><Link to="/upload" style={{color:"#fff", textDecoration:"none"}}>SafetySnap</Link></div>
      <div>
        {token ? (
          <>
            <Link to="/upload" style={{marginRight:15,color:"#fff"}}>Upload</Link>
            <Link to="/history" style={{marginRight:15,color:"#fff"}}>History</Link>
            <Link to="/analytics" style={{marginRight:15,color:"#fff"}}>Analytics</Link>
            <button onClick={handleLogout} style={{background:"#B22222", color:"#fff", border:"none", padding:"5px 10px", cursor:"pointer"}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:15,color:"#fff"}}>Login</Link>
            <Link to="/register" style={{color:"#fff"}}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
