import { useCallback } from "react";
import { AdCopy } from "../types";
interface Props {
  adData: AdCopy[];
  onChangeAdData: (index: number, newAdData: Partial<AdCopy>) => void;
}

export default function TableView({ adData, onChangeAdData }: Props) {
  const handleAdFieldChange = useCallback(
    (index: number, field: keyof AdCopy, value: string) => {
      onChangeAdData(index, { [field]: value });
    },
    [onChangeAdData]
  );

  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-50">
              <th className="p-3 text-left font-semibold text-gray-700 w-32">
                CREATIVE
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                PRIMARY TEXT
              </th>
              <th className="p-3 text-left font-semibold text-gray-700">
                HEADLINE
              </th>
              <th className="p-3 text-left font-semibold text-gray-700 w-32">
                CALL TO ACTION
              </th>
              <th className="p-3 text-left font-semibold text-gray-700 w-32">
                LAUNCH AS
              </th>
            </tr>
          </thead>
          <tbody>
            {adData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <span className="text-2xl">🖼️</span>
                      <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                        SINGLE
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <textarea
                    value={data.description}
                    onChange={(e) =>
                      handleAdFieldChange(index, "description", e.target.value)
                    }
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter primary text..."
                  />
                </td>
                <td className="p-2">
                  <input
                    type="text"
                    value={data.headline}
                    onChange={(e) =>
                      handleAdFieldChange(index, "headline", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter headline..."
                  />
                </td>
                <td className="p-2">
                  <select
                    value={data.callToAction}
                    onChange={(e) =>
                      handleAdFieldChange(index, "callToAction", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="Learn More">Learn More</option>
                    <option value="Shop Now">Shop Now</option>
                    <option value="Sign Up">Sign Up</option>
                    <option value="Download">Download</option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={data.launchAs}
                    onChange={(e) =>
                      handleAdFieldChange(index, "launchAs", e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 bg-gray-50 p-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">2 rows selected</div>
        <div className="text-xs text-yellow-600 bg-yellow-50 px-3 py-2 rounded">
          <strong>✅ Fixed!</strong> Make any row unique, then switch to Gallery
          View and back. Your unique edits are now preserved!
        </div>
      </div>
    </div>
  );
}
