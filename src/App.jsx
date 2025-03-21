import "./App.css";
import { Route, Routes } from "react-router-dom";
import Testimonials from "./pages/AnonymousTestimonialsArea";
import SupportGroups from "./pages/support-groups";
import Homepage from "./pages/Home/home";
import GeneralRegistration from "./pages/generalRegistration";
import DoctorRegistration from "./pages/doctorRegistration";
import PatientRegistration from "./pages/patientRegistration";


function App() {
  return (
    <Routes>
      <Route path="/anonymousTestimonial" element={<Testimonials />} />
      <Route path="/supportgroup" element={<SupportGroups />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/generalRegistration" element={<GeneralRegistration />} />
      <Route path="/doctorRegistration" element={<DoctorRegistration/>} />
      <Route path="/patientRegistration" element={<PatientRegistration/>} />

    </Routes>
  );
}

export default App;
