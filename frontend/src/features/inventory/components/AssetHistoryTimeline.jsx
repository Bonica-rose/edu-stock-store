import {
    FiUserPlus,
    FiRefreshCw,
    FiTool,
    FiAlertTriangle,
    FiMapPin,
} from "react-icons/fi";
import { getBranchName } from "../../../utils/branchUtils";

const getIcon = (type) => {
    switch (type) {
        case "assigned":
            return <FiUserPlus className="text-green-600" />;

        case "moved_branch":
            return <FiMapPin className="text-sky-600" />;

        case "maintenance":
            return <FiTool className="text-yellow-600" />;

        case "status_changed":
            return <FiAlertTriangle className="text-red-600" />;

        default:
            return <FiRefreshCw className="text-gray-500" />;
    }
};

const getColor = (type) => {
    switch (type) {
        case "assigned":
            return "border-green-700";

        case "moved_branch":
            return "border-sky-700";

        case "maintenance":
            return "border-yellow-700";

        case "status_changed":
            return "border-red-700";

        default:
            return "border-gray-300";
    }
};

const AssetHistoryTimeline = ({ history = [] }) => {
    return (
        <div className="space-y-4">
            {history.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No history found
                </p>
            ) : (
                history.map((item) => (
                    <div
                        key={item.id}
                        className="flex gap-3"
                    >
                        {/* ICON */}
                        <div className="flex flex-col items-center">
                            <div className="p-2 bg-white border rounded-full shadow-sm">
                                {getIcon(item.action_type)}
                            </div>

                            <div
                                className={`w-px h-full border-l-2 ${getColor(
                                    item.action_type
                                )}`}
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="pb-6">
                            <p className="font-medium text-gray-800">
                                {item.action_type
                                    .replace("_", " ")
                                    .toUpperCase()}
                            </p>

                            <p className="text-sm text-gray-600">
                                {item.notes ||
                                    "No additional notes"}
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                {new Date(
                                    item.created_at
                                ).toLocaleString()}
                            </p>

                            {/* OPTIONAL DETAILS */}
                            <div className="text-xs text-gray-600 mt-1 space-x-3">
                                {item.from_branch_id && (
                                    <span>
                                        From: {getBranchName(item.from_branch_id)}
                                    </span>
                                )}

                                {item.to_branch_id && (
                                    <span>
                                        To: {getBranchName(item.to_branch_id)}
                                    </span>
                                )}

                                {item.to_user_id && (
                                    <span>
                                        User: {item.to_user_id}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AssetHistoryTimeline;