const mockDashboardAPI = async () => {

    return {
        stats: {
            total_products: 120,
            total_assets: 560,
            low_stock_count: 14,
            total_branches: 6,
        },

        inventory_overview: [
            {
                name: "In Stock",
                value: 120,
            },
            {
                name: "Low Stock",
                value: 14,
            },
            {
                name: "Out Of Stock",
                value: 5,
            },
        ],

        asset_status_overview: [
            {
                name: "Assigned",
                value: 220,
            },
            {
                name: "Available",
                value: 180,
            },
            {
                name: "Maintenance",
                value: 20,
            },
            {
                name: "Retired",
                value: 8,
            },
        ],
    };
};

export default mockDashboardAPI;