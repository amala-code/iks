import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop"; // Import ScrollToTop
import Login from './Components/Forms/Login/Login';
import About from './Pages/About/About';
import Art from './Pages/Art_culture/Art';
import StarterPage from './Components/StarterPage';
import Events from './Pages/Events/Events';
import Gallery from './Pages/Gallery/Gallery';
import Contact from './Pages/Contact/Contact';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import CreateContent from "./Components/AdminPortal/CreteContent";
import AdminDashboard from "./Components/AdminPortal/Admindashboard";
import Memebr from "./Pages/IKSMember/Memebr";
import MembershipFlipCard from "./Pages/Member/member";
import CulturalPlatform from "./Pages/Home/Home2";

function App() {
  const [showStarterPage, setShowStarterPage] = useState(true);

  const handleStarterPageComplete = () => {
    setShowStarterPage(false); // Hide the starter page
  };

  return (
    <Router>
    <ScrollToTop /> 
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/art" element={<Art />} />
      <Route path="/iksmembers" element={<Memebr />} />
      <Route path="/events" element={<Events />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/membership" element={<MembershipFlipCard />} />

      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/createContent" element={<CreateContent/>} />
      <Route path="/AdminDashboard" element={<AdminDashboard/>} />
    </Routes>
    <Footer />
  </Router>
  
  );
}

export default App;