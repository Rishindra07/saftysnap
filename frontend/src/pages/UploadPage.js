// frontend/src/pages/UploadPage.js
import React, { useState } from "react";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a file");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/images`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Idempotency-Key": Date.now(),
        },
      });
      setMessage("Uploaded successfully!");
    } catch (err) {
      setMessage(err.response?.data?.error?.message || "Upload failed");
    }
  };

  return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <h2 style={{marginBottom:"30px", color:"#2d3748", fontSize:"28px"}}>Upload Image</h2>
      <div style={{maxWidth:"500px", margin:"0 auto", padding:"30px", background:"white", borderRadius:"12px", boxShadow:"0 4px 6px rgba(0,0,0,0.1)"}}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          style={{
            width:"100%",
            padding:"12px",
            marginBottom:"20px",
            border:"2px solid #e2e8f0",
            borderRadius:"8px",
            fontSize:"16px"
          }}
        />
        <button 
          onClick={handleUpload} 
          style={{
            padding:"12px 24px",
            backgroundColor:"#f56565",
            color:"white",
            border:"none",
            borderRadius:"8px",
            fontSize:"16px",
            cursor:"pointer",
            width:"100%"
          }}
        >
          Upload Image
        </button>
        {message && (
          <p style={{
            marginTop:"20px",
            padding:"12px",
            backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
            color: message.includes("success") ? "#155724" : "#721c24",
            borderRadius:"8px",
            border: message.includes("success") ? "1px solid #c3e6cb" : "1px solid #f5c6cb"
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
