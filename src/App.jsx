import { Route, Routes } from "react-router-dom";
import "./app.css";
import Testimonials  from "./pages/AnonymousTestimonialsArea"; 

function App() {
  return (
    <Routes>
      <Route path="/anonymousTestimonial" element={<Testimonials />} />
    </Routes>
  );
}

export default App;
