import "./index.css";
import { Route, Routes } from "react-router-dom";
import Testimonials from "./pages/AnonymousTestimonialsArea";
import SupportGroups from "./pages/support-groups";
import Login from "./pages/LoginPage/login";
import Home from "./pages/HomePage";
import { RegisterUsers } from "./pages/RegisterUsers";

function App() {
  return (
    <Routes>
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/supportgroup" element={<SupportGroups />} />
      <Route path="/login" element={< Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<RegisterUsers/>}/>
    </Routes>
  );  
}

export default App;
