import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";
import Saved from "./pages/Saved";
import Tracker from "./pages/Tracker";
import AiChat from "./components/AiChat";

export default function App() {
  const isDark = useSelector((state) => state.dark.isDark);

  return (
    <div className={isDark ? "dark" : ""}>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
          <AiChat />
        </div>
      </Router>
    </div>
  );
}