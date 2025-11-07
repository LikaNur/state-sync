import { ViewMode } from "./types";

// ============= VIEW TOGGLE =============
export default function ViewToggle({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex gap-2 mb-6">
      <button
        onClick={() => onChange("gallery")}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          mode === "gallery"
            ? "bg-blue-600 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        🖼️ Gallery Mode
      </button>
      <button
        onClick={() => onChange("table")}
        className={`px-6 py-2 rounded-md font-medium transition-colors ${
          mode === "table"
            ? "bg-green-600 text-white shadow-md"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        📊 Table Mode
      </button>
    </div>
  );
}
