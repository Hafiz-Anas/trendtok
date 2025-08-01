'use client';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterDropdown({ 
  label, 
  value, 
  options, 
  onChange, 
  placeholder = "Select..." 
}: FilterDropdownProps) {
  return (
    <div className="flex flex-col group">
      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2"></div>
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/50 focus:border-purple-400 dark:focus:border-purple-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium appearance-none cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-600 pr-10"
        >
          <option value="" className="text-gray-500 dark:text-gray-400">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-gray-900 dark:text-white bg-white dark:bg-gray-800">
              {option === 'all' ? 'All Categories' : option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-purple-400 dark:group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}