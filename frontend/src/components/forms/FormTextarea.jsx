const FormTextarea = ({
    label,
    placeholder,
    register,
    name,
    error,
    rows = 4,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}

            <textarea
                rows={rows}
                placeholder={placeholder}
                {...register(name)}
                className={`
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    outline-none
                    resize-none
                    transition
                    focus:ring-2
                    focus:ring-black
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

export default FormTextarea;