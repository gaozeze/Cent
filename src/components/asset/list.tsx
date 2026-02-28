import { useState } from "react";
import { useAssetStore, type Asset } from "@/store/asset";
import { Button } from "@/components/ui/button";
import { useIntl } from "@/locale";
import AssetEdit from "./edit";
import { cn } from "@/utils";

export default function AssetList() {
    const t = useIntl();
    const { assets, deleteAsset } = useAssetStore();
    const [editingAsset, setEditingAsset] = useState<Asset | undefined | null>(null); // null means list view, undefined means adding new asset? No, let's use:
    // viewState: 'list' | 'edit' | 'add'
    const [viewState, setViewState] = useState<'list' | 'edit' | 'add'>('list');
    const [selectedAsset, setSelectedAsset] = useState<Asset | undefined>(undefined);

    const handleEdit = (asset: Asset) => {
        setSelectedAsset(asset);
        setViewState('edit');
    };

    const handleAdd = () => {
        setSelectedAsset(undefined);
        setViewState('add');
    };

    const handleBack = () => {
        setViewState('list');
        setSelectedAsset(undefined);
    };

    if (viewState === 'edit' || viewState === 'add') {
        return (
            <div className="h-full flex flex-col">
                <Button variant="ghost" onClick={handleBack} className="self-start mb-2">
                    <i className="icon-[mdi--arrow-left] mr-1" />
                    Back
                </Button>
                <AssetEdit asset={selectedAsset} onClose={handleBack} />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full p-4 gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Assets</h2>
                <Button onClick={handleAdd} size="sm">
                    <i className="icon-[mdi--plus] mr-1" />
                    Add Asset
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-2">
                {assets.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        No assets found. Add one to get started.
                    </div>
                ) : (
                    assets.map((asset) => (
                        <div
                            key={asset.id}
                            className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            onClick={() => handleEdit(asset)}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium">{asset.name}</span>
                                <span className="text-xs text-gray-400 capitalize">{asset.type}</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={cn("font-bold", asset.balance < 0 ? "text-red-500" : "text-green-500")}>
                                    {asset.balance.toFixed(2)}
                                </span>
                                <span className="text-xs text-gray-400">{asset.currency}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
