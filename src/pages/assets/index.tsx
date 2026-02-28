import AssetList from "@/components/asset/list";
import { useIntl } from "@/locale";

export default function AssetsPage() {
    const t = useIntl();
    return (
        <div className="h-full w-full">
            <AssetList />
        </div>
    );
}
