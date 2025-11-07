import { create } from "zustand";
import type { AdCopy } from "./types";

interface StoreState {
  adCopy: AdCopy;
  adData: AdCopy[];
  updateField: (field: keyof AdCopy, value: string) => void;
  updateAll: (data: AdCopy) => void;
  updateAdData: (index: number, data: Partial<AdCopy>) => void;
}

const initialAdCopy: AdCopy = {
  headline: "Try Listening to Books Today!",
  description:
    "Tired of reading long texts? 📚👀\nSpeechify reads to you, so you can multitask while learning or relaxing. Available on all devices.",
  callToAction: "Learn More",
  launchAs: "active",
};

export const useAdStore = create<StoreState>((set) => ({
  adCopy: initialAdCopy,
  adData: [
    {
      ...initialAdCopy,
      isModified: false,
    },
    {
      ...initialAdCopy,
      isModified: false,
    },
  ],

  updateField: (field: keyof AdCopy, value: string) => {
    console.log(`[Store] 💾 Updating ${field} to:`, value);
    set((state) => {
      const updatedAdCopy = { ...state.adCopy, [field]: value };
      const updatedAdData = state.adData.map((ad) =>
        !ad.isModified ? { ...updatedAdCopy, isModified: false } : ad
      );
      return {
        adCopy: updatedAdCopy,
        adData: updatedAdData,
      };
    });
  },

  updateAll: (data: AdCopy) => {
    console.log("[Store] 💾 Updating all data:", data);
    set((state) => {
      const updatedAdData = state.adData.map((ad) =>
        !ad.isModified ? { ...data, isModified: false } : ad
      );
      return {
        adCopy: data,
        adData: updatedAdData,
      };
    });
  },

  updateAdData: (index: number, data: Partial<AdCopy>) => {
    set((state) => ({
      adData: state.adData.map((ad, i) =>
        i === index ? { ...ad, ...data, isModified: true } : ad
      ),
    }));
  },
}));
