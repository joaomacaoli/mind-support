import "./App.css";
import { Route, Routes } from "react-router-dom";
// import Testimonials from "./pages/AnonymousTestimonialsArea";
// import SupportGroups from "./pages/support-groups";
import Homepage from "./pages/Home/home";
import GeneralRegistration from "./pages/generalRegistration";
import DoctorRegistration from "./pages/doctorRegistration";
import PatientRegistration from "./pages/patientRegistration";

import HomePage from "./app/home";
import TestimonialsPage from "./app/testimonials";
import SupportGroupsPage from "./app/support-groups";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/support-groups" element={<SupportGroupsPage />} />

      <Route path="/generalRegistration" element={<GeneralRegistration />} />
      <Route path="/doctorRegistration" element={<DoctorRegistration />} />
      <Route path="/patientRegistration" element={<PatientRegistration />} />
    </Routes>
  );
}

export default App;
