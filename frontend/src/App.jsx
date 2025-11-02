import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import TypingRace from "./pages/TypingRace";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/race" element={<TypingRace />} />
      </Routes>
    </div>
  );
}

export default App;
