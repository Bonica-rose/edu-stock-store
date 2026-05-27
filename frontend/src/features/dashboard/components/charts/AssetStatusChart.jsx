import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const AssetStatusChart = ({
    data = [],
}) => {

    return (
        <div
            className="
                bg-white
                rounded-xl
                border border-gray-200
                shadow-sm
                p-5
            "
        >
            <h2 className="text-lg font-semibold mb-5">
                Asset Status Overview
            </h2>

            <div className="h-80">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >

                    <BarChart data={data}>

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="value" />

                    </BarChart>

                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default AssetStatusChart;