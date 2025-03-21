import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Testimonials from "./pages/AnonymousTestimonialsArea";
// import SupportGroups from "./pages/support-groups";
// import Homepage from "./pages/Home/home";
import GeneralRegistration from "./pages/generalRegistration";
import DoctorRegistration from "./pages/doctorRegistration";
import PatientRegistration from "./pages/patientRegistration";

import Login from "./app/login";
import HomePage from "./app/home";
import RegisterUsers from "./app/registers";
import TestimonialsPage from "./app/testimonials";
import SupportGroupsPage from "./app/support-groups";
import Construction from "./app/building";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/support-groups" element={<SupportGroupsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registers" element={<RegisterUsers />} />
      <Route path="/construction" element={<Construction />} />

      <Route path="/generalRegistration" element={<GeneralRegistration />} />
      <Route path="/doctorRegistration" element={<DoctorRegistration />} />
      <Route path="/patientRegistration" element={<PatientRegistration />} />
    </Routes>
  );
}

export default App;
