import { useState } from "react";
import { ChevronUp, ChevronDown, Plus } from "lucide-react";

export default function CustomFeeds({ sidebarOpen, title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-gray-400 pt-1 px-3">
      <ul className="space-y-2">
        {/* Section Header */}
        <li
          className="p-2 flex items-center justify-between cursor-pointer hover:bg-gray-800 rounded-md select-none transition-colors duration-200"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span
            className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </span>
          {sidebarOpen &&
            (isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </li>

        {/* Expandable Items */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen && sidebarOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {items.map((item, idx) => (
            <li
              key={idx}
              className="p-2 flex items-center gap-2 hover:bg-gray-800 rounded-md cursor-pointer select-none transition-colors duration-200"
              onClick={item.action} // you can use link navigation here too
            >
              {item.icon || <Plus size={16} />}
              <p
                className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </p>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
}
