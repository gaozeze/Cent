import { useId, useState } from "react";
import { toast } from "sonner";
import IOSUnscrolledInput from "@/components/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCurrency } from "@/hooks/use-currency";
import { useIntl } from "@/locale";
import { type Asset, type AssetType, useAssetStore } from "@/store/asset";

const assetTypes: { label: string; value: AssetType; icon: string }[] = [
    { label: "Cash", value: "cash", icon: "mdi--cash" },
    { label: "Debit Card", value: "debit", icon: "mdi--credit-card-outline" },
    { label: "Credit Card", value: "credit", icon: "mdi--credit-card" },
    { label: "Virtual Account", value: "virtual", icon: "mdi--wallet-outline" },
    { label: "Investment", value: "investment", icon: "mdi--finance" },
    { label: "Debt", value: "debt", icon: "mdi--hand-coin-outline" },
];

interface AssetEditProps {
    asset?: Asset;
    onClose: () => void;
}

export default function AssetEdit({ asset, onClose }: AssetEditProps) {
    const t = useIntl();
    const id = useId();
    const { addAsset, updateAsset } = useAssetStore();
    const { allCurrencies, baseCurrency } = useCurrency();
    const [name, setName] = useState(asset?.name || "");
    const [type, setType] = useState<AssetType>(asset?.type || "cash");
    const [balance, setBalance] = useState(asset?.balance?.toString() || "0");
    const [currency, setCurrency] = useState(
        asset?.currency || baseCurrency.id,
    );
    const [note, setNote] = useState(asset?.note || "");

    const handleSubmit = () => {
        if (!name) {
            toast.error("Name is required");
            return;
        }

        const numBalance = parseFloat(balance);
        if (isNaN(numBalance)) {
            toast.error("Invalid balance");
            return;
        }

        if (asset) {
            updateAsset(asset.id, {
                name,
                type,
                balance: numBalance,
                currency,
                note,
            });
            toast.success("Asset updated");
        } else {
            addAsset({
                id: crypto.randomUUID(),
                name,
                type,
                balance: numBalance,
                currency,
                note,
            });
            toast.success("Asset added");
        }
        onClose();
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-semibold mb-2">
                {asset ? "Edit Asset" : "Add Asset"}
            </h2>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor={`${id}-name`}>
                    Name
                </label>
                <IOSUnscrolledInput
                    id={`${id}-name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter asset name"
                    className="border p-2 rounded-md"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor={`${id}-type`}>
                    Type
                </label>
                <Select
                    value={type}
                    onValueChange={(v) => setType(v as AssetType)}
                >
                    <SelectTrigger className="w-full" id={`${id}-type`}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        {assetTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                                <div className="flex items-center gap-2">
                                    <i className={`icon-[${t.icon}]`} />
                                    {t.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="text-sm font-medium"
                    htmlFor={`${id}-balance`}
                >
                    Balance
                </label>
                <IOSUnscrolledInput
                    id={`${id}-balance`}
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Initial balance"
                    className="border p-2 rounded-md"
                />
            </div>
                    className="text-sm font-medium"
                    htmlFor={`${id}-currency`}
                

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor={`${id}-currency`}>
                    Currency
                </label>
                <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-full" id={`${id}-currency`}>
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        {allCurrencies.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.id} ({c.symbol})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium" htmlFor={`${id}-note`}>
                    Note
                </label>
                <IOSUnscrolledInput
                    id={`${id}-note`}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Optional note"
                    className="border p-2 rounded-md"
                />
            </div>

            <div className="flex gap-2 mt-4">
                <Button variant="ghost" onClick={onClose} className="flex-1">
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    className="flex-1 bg-primary text-primary-foreground"
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
