import React from "react";

const ToggleCell = ({ value, onChange, activeLabel = "active", inactiveLabel = "inactive" }) => {
    const isActive = value === "active";

    return (
        <button
            onClick={onChange}
            className={`px-2 py-1 rounded text-sm font-medium  ${
                isActive ? "bg-lime-100 text-lime-700" : "bg-orange-100 text-orange-700"
            }`}
        >
            {isActive ? activeLabel : inactiveLabel}
        </button>
    );
};

export default ToggleCell;