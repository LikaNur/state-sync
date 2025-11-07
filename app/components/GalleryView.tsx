// ============= GALLERY VIEW COMPONENT =============

import { useState, useEffect } from "react";
import { useAdStore } from "./store";
import { AdCopy } from "./types";

/**
 * Gallery View - Used when customer wants to launch ads with SAME copy
 *
 * Shows the ad copy that will be used for both media items.
 * Changes here should save to the store.
 */
export default function GalleryView() {
  const storeData = useAdStore((state) => state.adCopy);
  const updateField = useAdStore((state) => state.updateField);

  const [localHeadline, setLocalHeadline] = useState(storeData.headline);
  const [localDescription, setLocalDescription] = useState(
    storeData.description
  );
  const [localCTA, setLocalCTA] = useState(storeData.callToAction);
  const [localLaunchAs, setLocalLaunchAs] = useState(storeData.launchAs);

  // BUG: This syncs from store on EVERY change, preventing any forking
  useEffect(() => {
    console.log("[Gallery] 🔄 Syncing from store");
    setLocalHeadline(storeData.headline);
    setLocalDescription(storeData.description);
    setLocalCTA(storeData.callToAction);
    setLocalLaunchAs(storeData.launchAs);
  }, [storeData]);

  const handleChange = (field: keyof AdCopy, value: string) => {
    // Update local state
    if (field === "headline") setLocalHeadline(value);
    if (field === "description") setLocalDescription(value);
    if (field === "callToAction") setLocalCTA(value);
    if (field === "launchAs") setLocalLaunchAs(value as "active" | "paused");

    // Save to store immediately
    updateField(field, value);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* LEFT COLUMN - Ad Setup (Copy) */}
      <div className="col-span-5 border border-gray-300 rounded-lg bg-white shadow-sm p-4">
        <h2 className="text-base font-semibold mb-3">Ad Setup</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Primary Text
            </label>
            <textarea
              value={localDescription}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter primary text..."
              rows={3}
              className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="gallery-headline"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Headline
            </label>
            <input
              id="gallery-headline"
              name="headline"
              type="text"
              value={localHeadline}
              onChange={(e) => handleChange("headline", e.target.value)}
              placeholder="Enter headline..."
              className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Call to Action
            </label>
            <select
              value={localCTA}
              onChange={(e) => handleChange("callToAction", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select...</option>
              <option value="Learn More">Learn More</option>
              <option value="Shop Now">Shop Now</option>
              <option value="Sign Up">Sign Up</option>
              <option value="Download">Download</option>
              <option value="Get Quote">Get Quote</option>
            </select>
          </div>

          <div className="pt-2 border-t border-gray-300">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Launch ads as
            </label>
            <select
              value={localLaunchAs}
              onChange={(e) => handleChange("launchAs", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>
        </div>

        <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-800">
          <strong>📢 Same copy will be used for both ads</strong>
        </div>
      </div>

      {/* RIGHT COLUMN - Media Preview */}
      <div className="col-span-7 border border-gray-300 rounded-lg bg-white shadow-sm p-4">
        <h2 className="text-base font-semibold mb-3">Ads (2)</h2>

        <div className="grid grid-cols-2 gap-3">
          {/* Media Card 1 */}
          <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors">
            <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
              ✕
            </div>
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-4xl">🖼️</div>
            </div>
            <div className="absolute bottom-1.5 right-1.5 flex gap-1">
              <button className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-xs">
                👁️
              </button>
              <button className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-xs">
                🎨
              </button>
            </div>
            <div className="p-2 bg-white border-t border-gray-300">
              <div className="text-xs font-medium text-gray-700">Media 1</div>
            </div>
          </div>

          {/* Media Card 2 */}
          <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-colors">
            <div className="absolute top-1.5 left-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10">
              ✕
            </div>
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <div className="text-4xl">🖼️</div>
            </div>
            <div className="absolute bottom-1.5 right-1.5 flex gap-1">
              <button className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-xs">
                👁️
              </button>
              <button className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-xs">
                🎨
              </button>
            </div>
            <div className="p-2 bg-white border-t border-gray-300">
              <div className="text-xs font-medium text-gray-700">Media 2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
