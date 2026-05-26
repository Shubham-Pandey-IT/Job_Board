export default function FilterBar({ filters, setFilters }) {
  const types = ["All", "Remote", "Onsite", "Hybrid"];
  const roles = ["All", "Developer", "Designer", "Intern"];

  const handleType = (type) => {
    setFilters((prev) => ({ ...prev, type: type === "All" ? "" : type }));
  };

  const handleRole = (role) => {
    setFilters((prev) => ({ ...prev, role: role === "All" ? "" : role }));
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Type:</span>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => handleType(type)}
            className={`text-xs px-4 py-1.5 rounded-full border font-medium transition ${
              (filters.type === "" && type === "All") || filters.type === type
                ? "bg-rose-500 text-white border-rose-500"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Role:</span>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleRole(role)}
            className={`text-xs px-4 py-1.5 rounded-full border font-medium transition ${
              (filters.role === "" && role === "All") || filters.role === role
                ? "bg-rose-500 text-white border-rose-500"
                : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400"
            }`}
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}