import React from 'react';

const ButtonLoader = ({ size = "sm", color = "white", className = "" }) => {
    // Configurable size variants
    const sizeClasses = {
        xs: "w-3 h-3 border",
        sm: "w-4 h-4 border-2",
        md: "w-5 h-5 border-2",
        lg: "w-6 h-6 border-[3px]",
    };

    // Configurable color variants matching standard UI tones
    const colorClasses = {
        white: "border-white/30 border-t-white",
        slate: "border-slate-200 border-t-slate-600",
        blue: "border-blue-200 border-t-blue-600",
        yellow: "border-yellow-200 border-t-yellow-600",
    };

    return (
        <span
        className={`
            inline-block animate-spin rounded-full border-solid
            ${sizeClasses[size] || sizeClasses.sm}
            ${colorClasses[color] || colorClasses.white}
            ${className}
        `}
        role="status"
        aria-label="loading"
        />
    );
};

export default ButtonLoader;
