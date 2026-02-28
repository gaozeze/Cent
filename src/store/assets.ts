import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AssetType = 'cash' | 'debit' | 'credit' | 'virtual' | 'investment' | 'debt';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  balance: number;
  currency: string;
  note?: string;
  icon?: string;
  color?: string;
}

interface AssetState {
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  getAsset: (id: string) => Asset | undefined;
}

export const useAssetStore = create<AssetState>()(
  persist(
    (set, get) => ({
      assets: [],
      addAsset: (asset) =>
        set((state) => ({ assets: [...state.assets, asset] })),
      updateAsset: (id, updates) =>
        set((state) => ({
          assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),
      deleteAsset: (id) =>
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) })),
      getAsset: (id) => get().assets.find((a) => a.id === id),
    }),
    {
      name: 'asset-storage',
    }
  )
);