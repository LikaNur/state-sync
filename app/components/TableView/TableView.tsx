// ============= TABLE VIEW COMPONENT =============

import { RefObject, useEffect, useState } from "react";
import { useAdStore } from "../store";
import { AdCopy } from "../types";

/**
 * Table View - Used when customer wants UNIQUE copy for each media
 *
 * Shows 2 rows (one per media item).
 * Initially both rows show the same data, but user can edit each row independently.
 *
 * BUG: When switching views, all unique edits are lost!
 */

interface Props {
  row1IsCustomizedRef: RefObject<boolean>;
  row2IsCustomizedRef: RefObject<boolean>;
}

export default function TableView({
  row1IsCustomizedRef,
  row2IsCustomizedRef,
}: Props) {
  const storeData = useAdStore((state) => state.adCopy);
  // Row 1 - starts with store data
  const [row1Headline, setRow1Headline] = useState(storeData.headline);
  const [row1Description, setRow1Description] = useState(storeData.description);
  const [row1CTA, setRow1CTA] = useState(storeData.callToAction);
  const [row1LaunchAs, setRow1LaunchAs] = useState(storeData.launchAs);

  // Row 2 - starts with SAME data as Row 1
  const [row2Headline, setRow2Headline] = useState(storeData.headline);
  const [row2Description, setRow2Description] = useState(storeData.description);
  const [row2CTA, setRow2CTA] = useState(storeData.callToAction);
  const [row2LaunchAs, setRow2LaunchAs] = useState(storeData.launchAs);

  // BUG: This overwrites ALL rows whenever store changes!
  // This is the problem - when user makes any row unique, then switches to Gallery
  // and back, this effect overwrites all unique edits.
  useEffect(() => {
    console.log(
      "[Table] 📥 Syncing ALL rows from store (OVERWRITES ANY UNIQUE EDITS!)"
    );
    if (!row1IsCustomizedRef.current) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRow1Headline(storeData.headline);
      setRow1Description(storeData.description);
      setRow1CTA(storeData.callToAction);
      setRow1LaunchAs(storeData.launchAs);
    }

    if (!row2IsCustomizedRef.current) {
      setRow2Headline(storeData.headline);
      setRow2Description(storeData.description);
      setRow2CTA(storeData.callToAction);
      setRow2LaunchAs(storeData.launchAs);
    }
  }, [row1IsCustomizedRef, row2IsCustomizedRef, storeData]);

  // When Row 1 changes, update the store (so Gallery can see it)
  const handleRow1Change = (field: keyof AdCopy, value: string) => {
    if (!row1IsCustomizedRef.current) row1IsCustomizedRef.current = true;
    if (field === "headline") setRow1Headline(value);
    if (field === "description") setRow1Description(value);
    if (field === "callToAction") setRow1CTA(value);
    if (field === "launchAs") setRow1LaunchAs(value as "active" | "paused");

    // Update store so Gallery mode can sync
    // updateField(field, value);
  };

  // When Row 2 changes, just update local state (don't update store)
  const handleRow2Change = (field: keyof AdCopy, value: string) => {
    if (!row2IsCustomizedRef.current) row2IsCustomizedRef.current = true;
    if (field === "headline") setRow2Headline(value);
    if (field === "description") setRow2Description(value);
    if (field === "callToAction") setRow2CTA(value);
    if (field === "launchAs") setRow2LaunchAs(value as "active" | "paused");
  };

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
            {/* Row 1 - Media 1 */}
            <tr className="border-b border-gray-300 hover:bg-gray-50">
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
                  value={row1Description}
                  onChange={(e) =>
                    handleRow1Change("description", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter primary text..."
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row1Headline}
                  onChange={(e) => handleRow1Change("headline", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter headline..."
                />
              </td>
              <td className="p-2">
                <select
                  value={row1CTA}
                  onChange={(e) =>
                    handleRow1Change("callToAction", e.target.value)
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
                  value={row1LaunchAs}
                  onChange={(e) => handleRow1Change("launchAs", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </td>
            </tr>

            {/* Row 2 - Media 2 */}
            <tr className="border-b border-gray-300 hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <div className="relative w-16 h-16 rounded overflow-hidden bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <span className="text-2xl">🖼️</span>
                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                      SINGLE
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <textarea
                  value={row2Description}
                  onChange={(e) =>
                    handleRow2Change("description", e.target.value)
                  }
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter primary text..."
                />
              </td>
              <td className="p-2">
                <input
                  type="text"
                  value={row2Headline}
                  onChange={(e) => handleRow2Change("headline", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter headline..."
                />
              </td>
              <td className="p-2">
                <select
                  value={row2CTA}
                  onChange={(e) =>
                    handleRow2Change("callToAction", e.target.value)
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
                  value={row2LaunchAs}
                  onChange={(e) => handleRow2Change("launchAs", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Active</option>
                  <option value="paused">Paused</option>
                </select>
              </td>
            </tr>
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
