import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSaved, removeSaved } from "../store/savedSlice";
import { addTracker } from "../store/trackerSlice";
import { jobs } from "../data/jobs";
import { MapPin, Briefcase, DollarSign, Clock, ArrowLeft, Bookmark, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const savedJobs = useSelector((state) => state.saved.savedJobs);
  const trackerJobs = useSelector((state) => state.tracker.trackerJobs);

  const job = jobs.find((j) => j.id === Number(id));
  const [applied, setApplied] = useState(false);

  if (!job) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg font-medium">Job not found</p>
        <button onClick={() => navigate("/")} className="mt-4 text-rose-500 underline text-sm">
          Go back
        </button>
      </div>
    );
  }

  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleSave = () => {
    if (isSaved) {
      dispatch(removeSaved(job.id));
    } else {
      dispatch(addSaved(job));
    }
  };

  const handleApply = () => {
    const alreadyAdded = trackerJobs.some((j) => j.id === job.id);
    if (!alreadyAdded) {
      dispatch(addTracker({ ...job, status: "Applied" }));
    }
    setApplied(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition mb-6"
      >
        <ArrowLeft size={16} />
        Back to Jobs
      </button>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white flex items-center justify-center">
              <img
                src={`https://www.google.com/s2/favicons?domain=${job.company}.com&sz=64`}
                alt={job.company}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{job.company}</p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className={`p-2 rounded-full border transition ${
              isSaved
                ? "bg-rose-50 border-rose-200 text-rose-500"
                : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-rose-500"
            }`}
          >
            <Bookmark size={20} className={isSaved ? "fill-rose-500" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin size={15} className="text-rose-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Briefcase size={15} className="text-rose-400" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <DollarSign size={15} className="text-rose-400" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock size={15} className="text-rose-400" />
            <span>{job.posted}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <span className="text-xs bg-rose-50 dark:bg-rose-900/30 text-rose-500 px-3 py-1 rounded-full font-medium">
            {job.type}
          </span>
          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full font-medium">
            {job.role}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">About the Role</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{job.description}</p>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Requirements</h2>
        <div className="flex flex-wrap gap-2">
          {job.requirements.map((req) => (
            <span key={req} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full font-medium">
              {req}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={handleApply}
        disabled={applied}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm transition ${
          applied
            ? "bg-green-50 text-green-600 border border-green-200 cursor-not-allowed"
            : "bg-rose-500 text-white hover:bg-rose-600 active:scale-95"
        }`}
      >
        <ExternalLink size={16} />
        {applied ? "Applied ✓ — Check Tracker" : "Apply Now"}
      </button>

    </div>
  );
}