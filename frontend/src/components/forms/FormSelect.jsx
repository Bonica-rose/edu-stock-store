import Select from "react-select";

const FormSelect = ({
    label,
    options = [],
    value,
    onChange,
    error,
    placeholder = "Select...",
    isClearable = true,
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}

            <Select
                options={options}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isClearable={isClearable}
                classNamePrefix="react-select"
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    );
};

export default FormSelect;