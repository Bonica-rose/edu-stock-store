const FormFileUpload = ({
    label,
    accept,
    onChange,
    error,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}

            <input
                type="file"
                accept={accept}
                onChange={onChange}
                className={`
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    cursor-pointer
                    ${
                        error
                            ? "border-red-500"
                            : "border-gray-300"
                    }
                `}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default FormFileUpload;