import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Details.css';  // Import the CSS file

const Details = () => {
  const { id } = useParams(); // Get the id from the URL
  const [image, setImage] = useState(null); // Store the image details
  const [loading, setLoading] = useState(true); // For the loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    // Fetch the specific image details using the id
    fetch(`https://pixabay.com/api/?key=46193723-c71dd6e4249e10a2024b30b19&id=${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch image details");
        }
        return res.json();
      })
      .then((result) => {
        setImage(result.hits[0]); // Set the specific image data
      })
      .catch((error) => {
        console.error("Error fetching image details:", error);
        setError(error.message); // Set the error message
      })
      .finally(() => {
        setLoading(false); // Set loading to false when finished
      });
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!image) {
    return <p>No image data found!</p>;
  }

  return (
    
  <div>
      <div style={{ display: 'flex', justifyContent: 'space-between',backgroundColor:"#eeb965fa" }} id="navbg">
   <h1 style={{ color: 'white', fontFamily: 'Open Sans, system-ui',paddingLeft:'3vh' }}>GalleryViews</h1>
   <div style={{ width: '70vh' }} id="nav">
       <button>explore &nbsp; <i className="fa-solid fa-angle-down"></i></button>
       <button>Log in</button>
       <button id="join">join</button>
       <button id="upload"><i className="fa-solid fa-arrow-up-from-bracket"></i> &nbsp; upload</button>
   </div>
</div>
    <div className="details-page">
      <div className="image-container">
        <p>{image.tags}</p>
      <img
 style={{height:"70vh",width:"70vh"}}
  src={image.largeImageURL} 
  alt={image.tags || "Image"}
  onError={(e) => { e.target.src = 'path/to/placeholder/image.jpg'; }} 
/>

      </div>
      <div className="image-details">
        <p><span>Likes:</span> {image.likes}</p>
        <p><span>Views:</span> {image.views}</p>
       
      </div>
    </div>
  </div>
  );
};

export default Details;
