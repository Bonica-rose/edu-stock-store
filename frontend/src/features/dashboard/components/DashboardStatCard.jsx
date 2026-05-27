const DashboardStatCard = ({
    title,
    value,
    icon,
}) => {
    return (
        <div
            className="
                bg-white
                rounded-xl
                shadow-sm
                border border-gray-100
                p-5
            "
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-2">
                        {value}
                    </h2>
                </div>

                <div className="text-4xl text-primary">
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default DashboardStatCard;