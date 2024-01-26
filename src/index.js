import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import EntriesLayout from "./components/entry/EntriesLayout"
import Entries from "./components/entry/Entries"
import LongEntry from "./components/entry/LongEntry"
import NotFound from "./components/errordocs/NotFound"
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
// const AboutCard = React.lazy(()=> import("./components/about-card/AboutCard"));
import AboutCard from "./components/about-card/AboutCard";
const Gallery = React.lazy(()=> import("./components/gallery/Gallery"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} >
                <Route path="/" element = {<EntriesLayout />}>
                    <Route index element = {<Entries />}/>  
                </Route>
                <Route path="projects" element={<EntriesLayout />}>
                    <Route index element = {<Entries />}/>    
                    <Route path=":projectlink" element ={ <LongEntry />} />
                    <Route path="*" element={<NotFound />}/>
                </Route>
                <Route path="about" element={<AboutCard />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="*" element={<NotFound />}/>
            </Route>
            <Route path="*" element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
    );