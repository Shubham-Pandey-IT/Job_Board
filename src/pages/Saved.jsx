import { useSelector, useDispatch } from "react-redux";
import { removeSaved } from "../store/savedSlice";
import { useNavigate } from "react-router-dom";
import { Bookmark, MapPin } from "lucide-react";

export default function Saved() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.saved.savedJobs);

  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <Bookmark size={40} className="mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-medium">No saved jobs yet</p>
        <p className="text-sm mt-1">Bookmark jobs from the listing to see them here</p>
        <button onClick={() => navigate("/")} className="mt-6 text-sm text-rose-500 underline">
          Browse Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Saved Jobs</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {savedJobs.length} job{savedJobs.length > 1 ? "s" : ""} saved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {savedJobs.map((job) => (
          <div key={job.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div onClick={() => navigate(`/jobs/${job.id}`)} className="flex items-center gap-3 cursor-pointer">
                <div className="h-10 w-10 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white flex items-center justify-center">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${job.company}.com&sz=64`}
                    alt={job.company}
                    className="h-6 w-6 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-[15px]">{job.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{job.company}</p>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeSaved(job.id))}
                className="text-rose-400 hover:text-rose-600 transition"
              >
                <Bookmark size={20} className="fill-rose-400" />
              </button>
            </div>

            <div className="flex gap-2">
              <span className="text-xs bg-rose-50 dark:bg-rose-900/30 text-rose-500 px-3 py-1 rounded-full font-medium">{job.type}</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">{job.role}</span>
            </div>

            <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs">
                <MapPin size={13} />
                <span>{job.location}</span>
              </div>
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{job.salary}</span>
            </div>

            <button
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}