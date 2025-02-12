import { Route, Routes } from "react-router-dom";
import Testimonials from "./pages/AnonymousTestimonialsArea";

import "./app.css";
import SupportGroups from "./pages/support-groups";

function App() {
  return (
    <Routes>
      <Route path="/anonymousTestimonial" element={<Testimonials />} />
      <Route path="/supportgroup" element={<SupportGroups />} />
    </Routes>
  );
}

export default App;
