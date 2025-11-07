/**
 * AD DRAFT CHALLENGE - State Synchronization Problem
 *
 * THE CUSTOMER PROBLEM:
 * You're building an ad drafting tool. Customers can create ads in two modes:
 *
 * 1. GALLERY MODE: Launch 2 ads (one per media) using the SAME copy for both
 * 2. TABLE MODE: Launch 2 ads with UNIQUE copy for each media
 *
 * THE BUG:
 * When a user edits copy in Table Mode (making Row 1 and Row 2 different),
 * then switches to Gallery Mode and back to Table Mode, they lose their
 * unique edits! Both rows get reset to the Gallery copy.
 *
 * YOUR TASK:
 * Fix the state synchronization so that:
 * - Initially: Both views show the same data (synced)
 * - After editing in Table Mode: Each row maintains its unique copy
 * - Switching between views: Doesn't overwrite unique edits
 * - Gallery Mode: Still works for drafting ads with shared copy
 */

"use client";
import { useRef, useState } from "react";
import { useAdStore } from "./store";
import type { ViewMode } from "./types";
import TableView from "./TableView/TableView";
import GalleryView from "./GalleryView";

// ============= VIEW TOGGLE =============
const ViewToggle = ({
  mode,
  onChange,
}: {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) => {
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
};

// ============= MAIN APP =============
export default function AdDraftApp() {
  const [viewMode, setViewMode] = useState<ViewMode>("gallery");
  const storeData = useAdStore((state) => state.adCopy);
  const row1IsCustomized = useRef(false);
  const row2IsCustomized = useRef(false);

  const handleLaunchAds = () => {
    alert(
      "🚀 Launching 2 ads!\n\nThis is a demo - in real life, these would be submitted to the ad platform."
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">
            Ad Draft Challenge: State Sync Problem
          </h1>
          <p className="text-sm text-gray-600">
            Fix the state synchronization bug between Gallery and Table modes
          </p>
        </div>

        {/* Customer Problem - At the top */}
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
          <h3 className="font-bold text-lg mb-2 text-blue-900">
            🎯 The Customer Problem
          </h3>
          <p className="text-sm mb-3 text-gray-700">
            You&apos;re building an ad drafting tool. Customers have{" "}
            <strong>2 media files</strong> and want to create ads:
          </p>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white p-3 rounded border border-blue-200">
              <p className="font-semibold text-blue-700 mb-1">
                Option 1: Gallery Mode
              </p>
              <p className="text-gray-700 text-xs">
                Launch 2 ads (one per media) using the{" "}
                <strong>SAME copy</strong> for both.
              </p>
            </div>

            <div className="bg-white p-3 rounded border border-blue-200">
              <p className="font-semibold text-blue-700 mb-1">
                Option 2: Table Mode
              </p>
              <p className="text-gray-700 text-xs">
                Launch 2 ads with <strong>UNIQUE copy</strong> for each media.
              </p>
            </div>
          </div>
        </div>

        <ViewToggle mode={viewMode} onChange={setViewMode} />

        <div className="mb-4">
          {viewMode === "gallery" ? (
            <GalleryView />
          ) : (
            <TableView
              row1IsCustomized={row1IsCustomized}
              row2IsCustomized={row2IsCustomized}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mb-4 flex items-center justify-end gap-4 bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
          <button
            onClick={handleLaunchAds}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center gap-2 shadow-md"
          >
            <span>🚀</span> Launch Ads
          </button>
        </div>

        {/* Global Store State */}
        <div className="p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
          <h3 className="font-bold text-base mb-1 text-gray-900">
            📦 Global Store (Shared State)
          </h3>
          <p className="text-xs text-gray-600 mb-2">
            This is the source of truth that Gallery mode reads/writes to
          </p>
          <pre className="text-xs bg-gray-50 p-2 rounded border border-gray-300 overflow-x-auto font-mono">
            {JSON.stringify(storeData, null, 2)}
          </pre>
        </div>

        {/* Challenge Instructions */}
        <div className="space-y-3 mt-4">
          <div className="p-4 bg-red-50 rounded-lg border-2 border-red-300">
            <h3 className="font-bold text-lg mb-2 text-red-900">🐛 The Bug</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-white p-3 rounded border border-red-200">
                <p className="font-semibold text-red-700 mb-1.5 text-xs">
                  How to Reproduce:
                </p>
                <ol className="list-decimal ml-5 space-y-1 text-gray-700 text-xs">
                  <li>
                    Go to <strong>Table Mode</strong>
                  </li>
                  <li>
                    Make any row unique (e.g., change Row 2 headline to
                    &quot;Audiobooks Made Easy!&quot;)
                  </li>
                  <li>
                    Switch to <strong>Gallery Mode</strong>
                  </li>
                  <li>
                    Switch back to <strong>Table Mode</strong>
                  </li>
                  <li>
                    ❌ <strong>BUG</strong>: Your unique edits are gone! All
                    rows are identical again.
                  </li>
                </ol>
              </div>

              <div className="bg-white p-3 rounded border border-red-200">
                <p className="font-semibold text-red-700 mb-1.5 text-xs">
                  Why This Is a Problem:
                </p>
                <p className="text-gray-700 text-xs">
                  The customer spent time crafting unique copy for each ad, but
                  switching between views causes them to{" "}
                  <strong>lose their unique edits</strong>. This is frustrating
                  and makes the tool unreliable.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border-2 border-green-300">
            <h3 className="font-bold text-lg mb-2 text-green-900">
              ✅ Your Task
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                Fix the state synchronization so that:
              </p>

              <ul className="list-disc ml-5 space-y-1 text-gray-700 text-xs">
                <li>
                  <strong>Initially:</strong> Both Gallery and Table modes sync
                  from the store (they start with the same data)
                </li>
                <li>
                  <strong>When editing in Table Mode:</strong> Each row can
                  &quot;fork&quot; from the store and maintain its own unique
                  state
                </li>
                <li>
                  <strong>When switching views:</strong> Unique edits in any
                  Table Mode row are preserved
                </li>
                <li>
                  <strong>Gallery Mode behavior:</strong> Should still update
                  the store and any rows that haven&apos;t been customized
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border-2 border-gray-300">
            <h3 className="font-bold text-lg mb-2">🎓 Success Criteria</h3>
            <ul className="list-disc ml-5 space-y-1 text-xs text-gray-700">
              <li>Edit in Gallery Mode → All table rows update ✅</li>
              <li>Edit in Table Mode any row → It stays unique ✅</li>
              <li>
                Switching back and forth → Unique states are remembered ✅
              </li>
              <li>
                Customer doesn&apos;t lose their work when switching views ✅
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
