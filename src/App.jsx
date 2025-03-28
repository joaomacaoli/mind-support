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
import { AnamneseForm } from "./app/anamnese";
import { PacientProfile } from "./app/pacient-profile";
import PatientDashboard from "./app/pacient-dashboard";
import ProfessionalProfile from "./app/professional-profile";
import ProfessionalDashboard from "./app/professional-dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/support-groups" element={<SupportGroupsPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registers" element={<RegisterUsers />} />
      <Route path="/construction" element={<Construction />} />
      <Route path="/anamneses" element={<AnamneseForm />} />
      <Route path="/pacient-profile" element={<PacientProfile />} />
      <Route path="/pacient-dashboard" element={<PatientDashboard />} />
      <Route path="/professional-dashboard" element={<ProfessionalDashboard />} />
      <Route path="/professional-profile" element={<ProfessionalProfile />} />

      <Route path="/generalRegistration" element={<GeneralRegistration />} />
      <Route path="/doctorRegistration" element={<DoctorRegistration />} />
      <Route path="/patientRegistration" element={<PatientRegistration />} />
    </Routes>
  );
}

export default App;
