import PermissionRoute
from "./guards/PermissionRoute";

import ProductListPage
from "../features/inventory/pages/products/ProductListPage";

import ProductCreatePage
from "../features/inventory/pages/products/ProductCreatePage";

import ProductEditPage
from "../features/inventory/pages/products/ProductEditPage";

import AssetListPage
from "../features/inventory/pages/assets/AssetListPage";

import AssetDetailsPage
from "../features/inventory/pages/assets/AssetDetailsPage";

import InventoryPage
from "../features/inventory/pages/stock/InventoryPage";

import StockInPage
from "../features/inventory/pages/stock/StockInPage";

import StockOutPage
from "../features/inventory/pages/stock/StockOutPage";

import CreateTransferPage
from "../features/inventory/pages/transfers/CreateTransferPage";

import BranchTransferListPage
from "../features/inventory/pages/transfers/BranchTransferListPage";

import ComingSoonPage
from "./ComingSoonPage";

import { ROUTES } from "./routeConfig";

const inventoryRoutes = [

    // PRODUCTS
    {
        path: ROUTES.PRODUCTS,

        element: (
            <PermissionRoute permission="view_products" />
        ),

        children: [
            {
                index: true,
                element: <ProductListPage />,
            },

            {
                path: "create",

                element: (
                    <PermissionRoute permission="create_product">
                        <ProductCreatePage />
                    </PermissionRoute>
                ),
            },

            {
                path: ":id/edit",

                element: (
                    <PermissionRoute permission="update_product">
                        <ProductEditPage />
                    </PermissionRoute>
                ),
            },
        ],
    },

    // ASSETS
    {
        path: ROUTES.ASSETS,

        element: (
            <PermissionRoute permission="view_assets" />
        ),

        children: [
            {
                index: true,
                element: <AssetListPage />,
            },

            {
                path: ":id/tracking",

                element: (
                    <PermissionRoute permission="view_assets">
                        <AssetDetailsPage />
                    </PermissionRoute>
                ),
            },
        ],
    },

    // INVENTORY
    {
        path: ROUTES.INVENTORY,

        element: (
            <PermissionRoute permission="view_inventory" />
        ),

        children: [
            {
                index: true,
                element: <InventoryPage />,
            },

            {
                path: "stock-in",

                element: (
                    <PermissionRoute permission="update_inventory">
                        <StockInPage />
                    </PermissionRoute>
                ),
            },

            {
                path: "stock-out",

                element: (
                    <PermissionRoute permission="update_inventory">
                        <StockOutPage />
                    </PermissionRoute>
                ),
            },

            {
                path: "movements/:id",

                element: (
                    <PermissionRoute permission="view_inventory">
                        <ComingSoonPage />
                    </PermissionRoute>
                ),
            },
        ],
    },

    // BRANCH TRANSFERS
    {
        path: ROUTES.BRANCH_TRANSFERS,

        element: (
            <PermissionRoute permission="view_branch_transfers" />
        ),

        children: [
            {
                index: true,
                element: <BranchTransferListPage />,
            },

            {
                path: "create",

                element: (
                    <PermissionRoute permission="create_branch_transfer">
                        <CreateTransferPage />
                    </PermissionRoute>
                ),
            },

            {
                path: ":id",

                element: (
                    <PermissionRoute permission="view_branch_transfers">
                        <ComingSoonPage />
                    </PermissionRoute>
                ),
            },
        ],
    },
];

export default inventoryRoutes;