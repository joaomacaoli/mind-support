import "./App.css";
import { Route, Routes } from "react-router-dom";
import Testimonials from "./pages/AnonymousTestimonialsArea";
import SupportGroups from "./pages/support-groups";
import Login from "./pages/LoginPage/login";


function App() {
  return (
    <Routes>
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/supportgroup" element={<SupportGroups />} />
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );  
}

export default App;
