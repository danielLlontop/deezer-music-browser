import { create } from "zustand";
import { Data, IFavoritesStore } from "../types";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create<IFavoritesStore>()(persist((set, get) => ({
    favorites: [],
    trackData: undefined,
    setTrackData: (trackData: Data) => set(() => ({trackData: trackData})),
    addFavorite: (track: Data) => set((state) => ({
        favorites: [...state.favorites, track]
    })),
    removeFavorite: (id: number) => set((state) => ({
        favorites: state.favorites.filter(t => t.id !== id)
    })),
    clearFavorites: () => set(() => ({favorites: []})),
    isOnFavorites: (id: number) => get().favorites.some(t => t.id === id)
}),{
    name: 'favorites-tracks'
}))