import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "./App.jsx";
import Topbar from "./components/topbar/index.jsx";

const Main = () => {
  const location = useLocation();

  // onde não vai aparecer a TopBar
  const withoutTopbar =
    location.pathname !== "/pacient-dashboard" &&
    location.pathname !== "/pacient-profile" &&
    location.pathname !== "/patientRegistration" &&
    location.pathname !== "/construction" &&
    location.pathname !== "/professional-dashboard" &&
    location.pathname !== "/professional-profile";

  return (
    <>
      {withoutTopbar && <Topbar />}
      <App />
    </>
  );
};

export default Main;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/*<Topbar />
      <App /> */}
      <Main />
    </BrowserRouter>
  </React.StrictMode>
);
