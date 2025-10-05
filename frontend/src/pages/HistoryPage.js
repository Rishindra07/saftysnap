import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchImages = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/images?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setImages(res.data.items);
  };

  useEffect(() => { fetchImages(); }, [offset]);

  return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <h2 style={{marginBottom:"30px", color:"#2d3748", fontSize:"28px"}}>Image History</h2>
      <div style={{display:"flex", flexWrap:"wrap", gap:"20px", justifyContent:"center", maxWidth:"1200px", margin:"0 auto"}}>
        {images.map(img => (
          <Link
            key={img._id}
            to={`/result/${img._id}`}
            style={{
              display:"block",
              width:"200px",
              border:"2px solid #e2e8f0",
              borderRadius:"12px",
              padding:"15px",
              textDecoration:"none",
              color:"#2d3748",
              background:"#fff",
              boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
              transition:"transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-5px)";
              e.target.style.boxShadow = "0 8px 15px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${img.fileUrl}`}
              alt={img.filename}
              style={{width:"100%", height:"150px", objectFit:"cover", borderRadius:"8px", marginBottom:"15px"}}
            />
            <h4 style={{textAlign:"center", margin:"0 0 10px 0", fontSize:"16px"}}>{img.filename}</h4>
            <p style={{textAlign:"center", fontSize:"14px", color:"#667eea", fontWeight:"bold"}}>
              {img.detections.length} detection{img.detections.length !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>
      {images.length === 0 && (
        <div style={{
          padding:"40px",
          background:"white",
          borderRadius:"12px",
          boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
          maxWidth:"400px",
          margin:"0 auto"
        }}>
          <p style={{color:"#718096", fontSize:"16px"}}>No images found. Upload some images to see them here!</p>
        </div>
      )}
      <div style={{marginTop:"30px"}}>
        <button 
          disabled={offset===0} 
          onClick={() => setOffset(offset-limit)}
          style={{
            padding:"10px 20px",
            backgroundColor: offset === 0 ? "#e2e8f0" : "#f56565",
            color: offset === 0 ? "#a0aec0" : "white",
            border:"none",
            borderRadius:"8px",
            fontSize:"14px",
            cursor: offset === 0 ? "not-allowed" : "pointer",
            marginRight:"10px"
          }}
        >
          Previous
        </button>
        <button 
          onClick={() => setOffset(offset+limit)} 
          style={{
            padding:"10px 20px",
            backgroundColor:"#f56565",
            color:"white",
            border:"none",
            borderRadius:"8px",
            fontSize:"14px",
            cursor:"pointer"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
