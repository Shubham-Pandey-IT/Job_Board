import { useSelector, useDispatch } from "react-redux";
import { removeTracker, updateStatus } from "../store/trackerSlice";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin } from "lucide-react";

const statusOptions = ["Applied", "Interview", "Rejected", "Offer"];

const statusStyles = {
  Applied:   "bg-blue-50 text-blue-600 border-blue-200",
  Interview: "bg-yellow-50 text-yellow-600 border-yellow-200",
  Rejected:  "bg-red-50 text-red-500 border-red-200",
  Offer:     "bg-green-50 text-green-600 border-green-200",
};

export default function Tracker() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const trackerJobs = useSelector((state) => state.tracker.trackerJobs);

  if (trackerJobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <Briefcase size={40} className="mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">No applications yet</p>
        <p className="text-sm mt-1">Apply to jobs to track them here</p>
        <button onClick={() => navigate("/")} className="mt-6 text-sm text-rose-500 underline">
          Browse Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 text-sm mt-1">
          {trackerJobs.length} application{trackerJobs.length > 1 ? "s" : ""} tracked
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statusOptions.map((status) => (
          <div key={status} className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">
              {trackerJobs.filter((j) => j.status === status).length}
            </p>
            <p className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full border inline-block ${statusStyles[status]}`}>
              {status}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {trackerJobs.map((job) => (
          <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div onClick={() => navigate(`/jobs/${job.id}`)} className="flex items-center gap-3 cursor-pointer flex-1">
              <div className="h-10 w-10 rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
                <img
                  src={`https://www.google.com/s2/favicons?domain=${job.company}.com&sz=64`}
                  alt={job.company}
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-[15px]">{job.title}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <p className="text-gray-500 text-sm">{job.company}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <MapPin size={11} />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={job.status}
                onChange={(e) => dispatch(updateStatus({ id: job.id, status: e.target.value }))}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border outline-none cursor-pointer ${statusStyles[job.status]}`}
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <button
                onClick={() => dispatch(removeTracker(job.id))}
                className="text-xs text-gray-400 hover:text-red-500 transition border border-gray-200 px-3 py-1.5 rounded-full"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}