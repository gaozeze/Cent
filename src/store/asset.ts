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
  createdAt: number;
  updatedAt: number;
}

interface AssetState {
  assets: Asset[];
  addAsset: (asset: Omit<Asset, 'createdAt' | 'updatedAt'>) => void;
  updateAsset: (id: string, updates: Partial<Omit<Asset, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteAsset: (id: string) => void;
  getAsset: (id: string) => Asset | undefined;
}

export const useAssetStore = create<AssetState>()(
  persist(
    (set, get) => ({
      assets: [],
      addAsset: (asset) => {
        const now = Date.now();
        const newAsset = { ...asset, createdAt: now, updatedAt: now };
        set((state) => ({ assets: [...state.assets, newAsset] }));
      },
      updateAsset: (id, updates) => {
        const now = Date.now();
        set((state) => ({
          assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates, updatedAt: now } : a)),
        }));
      },
      deleteAsset: (id) =>
        set((state) => ({ assets: state.assets.filter((a) => a.id !== id) })),
      getAsset: (id) => get().assets.find((a) => a.id === id),
    }),
    {
      name: 'asset-storage',
    }
  )
);
