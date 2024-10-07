import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Search = () => {
    const { imgname } = useParams(); // The search term from the URL
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (imgname) {
            console.log(`Fetching data for: ${imgname}`); // Log the search term
            fetch(`https://pixabay.com/api/?key=46193723-c71dd6e4249e10a2024b30b19&q=${imgname}&image_type=photo&pretty=true`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("Failed to fetch");
                    }
                    return res.json();
                })
                .then((result) => {
                    console.log("API Response:", result); // Log the API response
                    setData(result.hits);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [imgname]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {data.length > 0 ? (
                <ul>
                    {data.map((image) => (
                        <li key={image.id}>
                            <img
                                src={image.previewURL}
                                alt={image.tags}
                                onClick={() => navigate(`/details/${image.id}`)} // Navigate to /details/:id
                            />
                            <p>{image.tags}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No images found.</p>
            )}
        </div>
    );
};

export default Search;
