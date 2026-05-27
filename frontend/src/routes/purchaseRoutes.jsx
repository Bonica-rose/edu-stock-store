import PermissionRoute from "./guards/PermissionRoute";
import ComingSoonPage from "./ComingSoonPage";
import { ROUTES } from "./routeConfig";

// VENDORS
import VendorListPage
    from "../features/purchases/vendors/pages/VendorListPage";

import VendorCreatePage
    from "../features/purchases/vendors/pages/VendorCreatePage";

import VendorEditPage
    from "../features/purchases/vendors/pages/VendorEditPage";

// PURCHASE REQUESTS
// import PurchaseRequestListPage
//     from "../features/purchases/purchaseRequests/pages/PurchaseRequestListPage";

// import PurchaseRequestCreatePage
//     from "../features/purchases/purchaseRequests/pages/PurchaseRequestCreatePage";

// import PurchaseRequestEditPage
//     from "../features/purchases/purchaseRequests/pages/PurchaseRequestEditPage";

// // PURCHASE ORDERS
// import PurchaseOrderListPage
//     from "../features/purchases/purchaseOrders/pages/PurchaseOrderListPage";

// import PurchaseOrderCreatePage
//     from "../features/purchases/purchaseOrders/pages/PurchaseOrderCreatePage";

// import PurchaseOrderEditPage
//     from "../features/purchases/purchaseOrders/pages/PurchaseOrderEditPage";

// // GOODS RECEIVED
// import GoodsReceivedListPage
//     from "../features/purchases/goodsReceived/pages/GoodsReceivedListPage";

// import GoodsReceivedCreatePage
//     from "../features/purchases/goodsReceived/pages/GoodsReceivedCreatePage";

const purchaseRoutes = [

    // VENDORS
    {
        path: ROUTES.VENDORS,
        element: (
            <PermissionRoute permission="view_vendors" />
        ),
        children: [
            {
                index: true,
                element: <VendorListPage />,
            },

            {
                path: "create",
                element: (
                    <PermissionRoute permission="create_vendor">
                        <VendorCreatePage />
                    </PermissionRoute>
                ),
            },

            {
                path: ":id/edit",
                element: (
                    <PermissionRoute permission="update_vendor">
                        <VendorEditPage />
                    </PermissionRoute>
                ),
            },
        ],
    },

    // PURCHASE REQUESTS
    // {
    //     path: ROUTES.PURCHASE_REQUESTS,
    //     element: (
    //         <PermissionRoute permission="view_purchase_requests" />
    //     ),
    //     children: [
    //         {
    //             index: true,
    //             element: <PurchaseRequestListPage />,
    //         },
    //         {
    //             path: "create",
    //             element: (
    //                 <PermissionRoute permission="create_purchase_request">
    //                     <PurchaseRequestCreatePage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //         {
    //             path: ":id/edit",
    //             element: (
    //                 <PermissionRoute permission="update_purchase_request">
    //                     <PurchaseRequestEditPage />
    //                 </PermissionRoute>
    //             ),
    //         },

    //         {
    //             path: ":id",
    //             element: (
    //                 <PermissionRoute permission="view_purchase_requests">
    //                     <ComingSoonPage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //     ],
    // },

    // PURCHASE ORDERS
    // {
    //     path: ROUTES.PURCHASE_ORDERS,
    //     element: (
    //         <PermissionRoute permission="view_purchase_orders" />
    //     ),

    //     children: [
    //         {
    //             index: true,
    //             element: <PurchaseOrderListPage />,
    //         },
    //         {
    //             path: "create",
    //             element: (
    //                 <PermissionRoute permission="create_purchase_order">
    //                     <PurchaseOrderCreatePage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //         {
    //             path: ":id/edit",

    //             element: (
    //                 <PermissionRoute permission="update_purchase_order">
    //                     <PurchaseOrderEditPage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //         {
    //             path: ":id",
    //             element: (
    //                 <PermissionRoute permission="view_purchase_orders">
    //                     <ComingSoonPage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //     ],
    // },

    // GOODS RECEIVED NOTES (GRN)
    // {
    //     path: ROUTES.GOODS_RECEIVED,
    //     element: (
    //         <PermissionRoute permission="view_goods_received" />
    //     ),
    //     children: [
    //         {
    //             index: true,
    //             element: <GoodsReceivedListPage />,
    //         },
    //         {
    //             path: "create",
    //             element: (
    //                 <PermissionRoute permission="create_goods_received">
    //                     <GoodsReceivedCreatePage />
    //                 </PermissionRoute>
    //             ),
    //         },

    //         {
    //             path: ":id",
    //             element: (
    //                 <PermissionRoute permission="view_goods_received">
    //                     <ComingSoonPage />
    //                 </PermissionRoute>
    //             ),
    //         },
    //     ],
    // },
];

export default purchaseRoutes;