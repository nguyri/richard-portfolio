import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutCard from "./components/about-card/AboutCard"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="about" element={<AboutCard />} />
            </Route>
        </Routes>
    </BrowserRouter>
    , document.getElementById("root"));