import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  standardId: string;
  note: string;
  createdAt: string;
}

export interface HistoryItem {
  standardId: string;
  viewedAt: string;
}

export interface AppState {
  favorites: FavoriteItem[];
  history: HistoryItem[];
  toggleFavorite: (standardId: string) => void;
  isFavorite: (standardId: string) => boolean;
  setFavoriteNote: (standardId: string, note: string) => void;
  pushHistory: (standardId: string) => void;
  clearHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      toggleFavorite: (id) =>
        set((s) => {
          if (s.favorites.some((f) => f.standardId === id)) {
            return { favorites: s.favorites.filter((f) => f.standardId !== id) };
          }
          return {
            favorites: [
              ...s.favorites,
              {
                standardId: id,
                note: "",
                createdAt: new Date().toISOString(),
              },
            ],
          };
        }),
      isFavorite: (id) => get().favorites.some((f) => f.standardId === id),
      setFavoriteNote: (id, note) =>
        set((s) => ({
          favorites: s.favorites.map((f) =>
            f.standardId === id ? { ...f, note } : f,
          ),
        })),
      pushHistory: (id) =>
        set((s) => {
          const next = [
            { standardId: id, viewedAt: new Date().toISOString() },
            ...s.history.filter((h) => h.standardId !== id),
          ].slice(0, 20);
          return { history: next };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "standardum-app" },
  ),
);
