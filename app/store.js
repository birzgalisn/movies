import create from "zustand";

export const useStore = create((set) => ({
  selectedGenres: [],
  availableGenres: [],
  setSelectedGenres: (payload) => set({ selectedGenres: payload }),
  setAvailableGenres: (payload) => set({ availableGenres: payload }),
}));
