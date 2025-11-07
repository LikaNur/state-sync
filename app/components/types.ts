export type ViewMode = "gallery" | "table";

export interface AdCopy {
  headline: string;
  description: string;
  callToAction: string;
  launchAs: "active" | "paused";
  isModified?: boolean;
}

export interface StoreState {
  adCopy: AdCopy;
  updateField: (field: keyof AdCopy, value: string) => void;
  updateAll: (data: AdCopy) => void;
}
