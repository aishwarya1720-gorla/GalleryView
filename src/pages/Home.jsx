import React, { useState } from 'react';
// import Details from './Details';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
    let navigate = useNavigate();   
    const [imgname, setImagename] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && imgname.trim()) {
            console.log("Search initiated for:", imgname); // Debugging log
            performSearch(imgname.trim());
        }
    };

    const performSearch = (query) => {
        setLoading(true);
        setError(null);
        console.log("Performing search for:", query); // Debugging log
        fetch(`https://pixabay.com/api/?key=46193723-c71dd6e4249e10a2024b30b19&q=${query}&image_type=photo&pretty=true`)
            .then(res => res.json())
            .then(result => {
                console.log("API Response:", result); // Debugging log
                setData(result.hits);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error); // Debugging log
                setError('Error fetching data');
                setLoading(false);
            });
    };

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
        <div id="bgimage">
           
            <div id="search">
                <h1 style={{ fontSize: '40px', paddingBottom: '2vh' }}>Stunning royalty-free images & royalty-free stock</h1>
                <h2 style={{ fontSize: '20px', paddingBottom: '2vh', fontWeight: '300' }}>Over 5 million+ high quality stock images, videos, and music shared by our talented community.</h2>
                <div id="button1">
                    <span><i className="fa-solid fa-magnifying-glass"></i></span>
                    <input 
                        type="text" 
                        placeholder='Search for all images on GalleryViews' 
                        size="90" 
                        style={{ border: 'none' }} 
                        onChange={(e) => setImagename(e.target.value)} 
                        onKeyDown={handleKeyDown}
                    />
                    <span>All Images &nbsp; <i className="fa-solid fa-angle-down"></i></span>
                </div>
            </div>

            {/* Search Results Section */}
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : data.length > 0 ? (
                    <ul className="image-list">
                        {data.map((image) => (
                            <li key={image.id} className="image-item">
                                <img src={image.previewURL} alt={image.tags} className="image-preview" />
                                <p>{image.tags}</p>
                               <p><button style={{color:"black"}}   onClick={() => navigate(`/Details/${image.id}`)}>view</button></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No images found. Please search for something.</p>
                )}
            </div>
            <Footer/>
        </div>
       </div>
    );
};

export default Home;
