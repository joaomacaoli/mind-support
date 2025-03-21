import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Topbar from "./components/topbar/index.jsx";


const Main = () => {
  const location = useLocation();
  // onde não vai aparecer a TopBar
  const showTopbar = location.pathname !== "/generalRegistration" &&
                    location.pathname !== "/doctorRegistration" &&
                    location.pathname !== "/patientRegistration" ; 

  return (
    <>
      {showTopbar && <Topbar />}
      <App />
    </>
  );
};


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*<Topbar />
      <App /> */}
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
