import { MapPin, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addSaved, removeSaved } from "../store/savedSlice";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.saved.savedJobs);

  const isSaved = savedJobs.some((j) => j.id === job.id);

  const handleSave = (e) => {
    e.stopPropagation();
    if (isSaved) {
      dispatch(removeSaved(job.id));
    } else {
      dispatch(addSaved(job));
    }
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${job.id}`)}
      className="bg-white border border-gray-200 rounded-2xl p-5 cursor-pointer hover:shadow-md transition flex flex-col gap-3"
    >
      <div className="flex justify-between items-start">
        <div className="h-10 w-10 rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center">
          <img
            src={`https://www.google.com/s2/favicons?domain=${job.company}.com&sz=64`}
            alt={job.company}
            className="h-6 w-6 object-contain"
          />
        </div>
        <button onClick={handleSave} className="text-gray-400 hover:text-rose-500 transition">
          <Bookmark size={20} className={isSaved ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 text-[15px]">{job.title}</h3>
        <p className="text-gray-500 text-sm mt-0.5">{job.company}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs bg-rose-50 text-rose-500 px-3 py-1 rounded-full font-medium">{job.type}</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">{job.role}</span>
      </div>

      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <MapPin size={13} />
          <span>{job.location}</span>
        </div>
        <span className="text-xs font-semibold text-gray-700">{job.salary}</span>
      </div>
    </div>
  );
}