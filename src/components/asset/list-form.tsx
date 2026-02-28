import createConfirmProvider from "@/components/confirm";
import AssetList from "./list";

export const [AssetListProvider, showAssetList] = createConfirmProvider(
    AssetList,
    {
        dialogTitle: "Assets",
        dialogModalClose: true,
        contentClassName:
            "h-full w-full max-h-full max-w-full rounded-none sm:rounded-md sm:max-h-[55vh] sm:w-[90vw] sm:max-w-[500px]",
    },
);
