import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#22c55e",
    "#f59e0b",
    "#ef4444",
];

const InventoryOverviewChart = ({
    data = [],
}) => {

    return (
        <div
            className="
                bg-white
                rounded-xl
                shadow-sm
                border border-gray-200
                p-5
            "
        >
            <h2 className="text-lg font-semibold mb-5">
                Inventory Overview
            </h2>

            <div className="h-75">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={100}
                            label
                        >

                            {
                                data.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[index]
                                            }
                                        />
                                    )
                                )
                            }

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default InventoryOverviewChart;