import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import JobDetail from "./pages/JobDetail";

export default function App() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [trackerJobs, setTrackerJobs] = useState([]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home savedJobs={savedJobs} setSavedJobs={setSavedJobs} />}
          />
          <Route
            path="/jobs/:id"
            element={
              <JobDetail
                savedJobs={savedJobs}
                setSavedJobs={setSavedJobs}
                trackerJobs={trackerJobs}
                setTrackerJobs={setTrackerJobs}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
