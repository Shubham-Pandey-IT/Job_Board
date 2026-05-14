import { useState } from "react";
import { jobs } from "../data/jobs";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import JobList from "../components/JobList";

export default function Home({ savedJobs, setSavedJobs }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ type: "", role: "" });

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === "" || job.type === filters.type;
    const matchesRole = filters.role === "" || job.role === filters.role;
    return matchesSearch && matchesType && matchesRole;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Find your next job 🚀</h1>
        <p className="text-gray-500 text-sm mt-1">Browse through latest openings</p>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <FilterBar filters={filters} setFilters={setFilters} />
      </div>

      <JobList jobs={filtered} savedJobs={savedJobs} setSavedJobs={setSavedJobs} />
    </main>
  );
}