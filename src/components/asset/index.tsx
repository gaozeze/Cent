import { Button } from "@/components/ui/button";
import { useIntl } from "@/locale";
import { AssetListProvider, showAssetList } from "./list-form";

export { AssetListProvider, showAssetList };

export default function AssetSettingsItem() {
    const t = useIntl();
    return (
        <div className="backup">
            <Button
                onClick={() => {
                    showAssetList();
                }}
                variant="ghost"
                className="w-full py-4 rounded-none h-auto"
            >
                <div className="w-full px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <i className="icon-[mdi--bank-outline] size-5"></i>
                        <span>Assets</span>
                    </div>
                    <i className="icon-[mdi--chevron-right] size-5"></i>
                </div>
            </Button>
        </div>
    );
}
