import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Entries from "./components/entry/Entries"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutCard from "./components/about-card/AboutCard"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="projects" element={<Entries />} />
                <Route path="about" element={<AboutCard />} />
                <Route
                    path="*"
                    element={
                        <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                        </main>
                        }
                    />
            </Route>
        </Routes>
    </BrowserRouter>
    , document.getElementById("root"));