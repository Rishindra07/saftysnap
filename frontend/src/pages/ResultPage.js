import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ResultPage() {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/images/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setImage(res.data));
  }, [id]);

  if (!image) return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"400px",
        fontSize:"18px",
        color:"#718096"
      }}>
        Loading...
      </div>
    </div>
  );

  return (
    <div style={{padding:"20px", textAlign:"center"}}>
      <h2 style={{marginBottom:"30px", color:"#2d3748", fontSize:"28px"}}>{image.filename}</h2>
      <div style={{maxWidth:"800px", margin:"0 auto"}}>
        <div style={{position:"relative", display:"inline-block", marginBottom:"20px"}}>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/${image.fileUrl}`}
            alt={image.filename}
            style={{maxWidth:"500px", borderRadius:"12px", boxShadow:"0 4px 6px rgba(0,0,0,0.1)"}}
          />
          {image.detections.map((d,i) => {
            const [x1,y1,x2,y2] = d.bbox.map(v => v*500); // assuming width 500px
            const isHelmet = d.label.toLowerCase() === 'helmet';
            const boxColor = isHelmet ? '#22c55e' : '#3b82f6'; // Green for helmet, Blue for vest
            const bgColor = isHelmet ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)';
            
            return (
              <div key={i} style={{
                position:"absolute",
                left:x1,
                top:y1,
                width:x2-x1,
                height:y2-y1,
                border:`3px solid ${boxColor}`,
                background:bgColor,
                borderRadius:"4px"
              }}>
                <span style={{
                  fontSize:"12px", 
                  color:"#fff", 
                  background:boxColor,
                  padding:"2px 6px",
                  borderRadius:"4px",
                  fontWeight:"bold"
                }}>
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
        {image.detections.length > 0 && (
          <div style={{
            background:"white",
            padding:"20px",
            borderRadius:"12px",
            boxShadow:"0 4px 6px rgba(0,0,0,0.1)",
            marginTop:"20px"
          }}>
            <h3 style={{color:"#2d3748", marginBottom:"15px"}}>Detection Results</h3>
            <div style={{display:"flex", justifyContent:"center", gap:"20px", flexWrap:"wrap"}}>
              {image.detections.map((d, i) => {
                const isHelmet = d.label.toLowerCase() === 'helmet';
                const bgColor = isHelmet ? '#22c55e' : '#3b82f6'; // Green for helmet, Blue for vest
                
                return (
                  <div key={i} style={{
                    padding:"10px 20px",
                    backgroundColor:bgColor,
                    color:"white",
                    borderRadius:"8px",
                    fontSize:"14px",
                    fontWeight:"bold"
                  }}>
                    {d.label} ({Math.round(d.confidence * 100)}%)
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
