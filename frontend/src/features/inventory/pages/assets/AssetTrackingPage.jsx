import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const AssetTrackingPage = () => {
    const { id } = useParams();

    const { products = [] } = useSelector(
        (state) => state.inventory || {}
    );

    const asset = products.find(
        (p) => String(p.id) === String(id)
    );

    if (!asset) {
        return (
            <div className="p-6 text-gray-500">
                Asset not found
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">
                {asset.name}
            </h1>

            <p>SKU: {asset.sku}</p>
            <p>Status: {asset.asset_status}</p>
            <p>Branch: {asset.branch_id}</p>
        </div>
    );
};

export default AssetTrackingPage;