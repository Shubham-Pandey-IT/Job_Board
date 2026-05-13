import { Search } from "lucide-react";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition">
      <Search size={18} className="text-gray-400" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by job title or company..."
        className="flex-1 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400"
      />
    </div>
  );
}