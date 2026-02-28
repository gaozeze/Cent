import type { Asset, AssetType } from "@/ledger/type";
import { useLedgerStore } from "./ledger";

export type { Asset, AssetType };

export const useAssetStore = () => {
    // Select assets from global meta
    const assets = useLedgerStore((state) => state.infos?.meta?.assets || []);

    const addAsset = (asset: Omit<Asset, "createdAt" | "updatedAt">) => {
        const now = Date.now();
        const newAsset: Asset = { ...asset, createdAt: now, updatedAt: now };

        useLedgerStore.getState().updateGlobalMeta((prev) => {
            const currentAssets = prev.assets || [];
            return {
                ...prev,
                assets: [...currentAssets, newAsset],
            };
        });
    };

    const updateAsset = (
        id: string,
        updates: Partial<Omit<Asset, "id" | "createdAt" | "updatedAt">>,
    ) => {
        const now = Date.now();
        useLedgerStore.getState().updateGlobalMeta((prev) => {
            const currentAssets = prev.assets || [];
            return {
                ...prev,
                assets: currentAssets.map((a) =>
                    a.id === id ? { ...a, ...updates, updatedAt: now } : a,
                ),
            };
        });
    };

    const deleteAsset = (id: string) => {
        useLedgerStore.getState().updateGlobalMeta((prev) => {
            const currentAssets = prev.assets || [];
            return {
                ...prev,
                assets: currentAssets.filter((a) => a.id !== id),
            };
        });
    };

    const getAsset = (id: string) => {
        return assets.find((a) => a.id === id);
    };

    return {
        assets,
        addAsset,
        updateAsset,
        deleteAsset,
        getAsset,
    };
};

