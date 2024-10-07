import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import './App.css';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:imgname" element={<Search />} />
                    {/* Use /details/:id for the details page */}
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
