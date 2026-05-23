const FormInput = ({
    label,
    type = "text",
    placeholder,
    register,
    name,
    error,
    required = false,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium">
                    {label}

                    {required && (
                        <span className="text-red-500 ml-1">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                {...props}
                className={`
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    outline-none
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

export default FormInput;