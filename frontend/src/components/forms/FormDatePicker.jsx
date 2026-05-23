import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const FormDatePicker = ({
    label,
    selected,
    onChange,
    error,
    dateFormat = "yyyy-MM-dd",
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium">
                    {label}
                </label>
            )}

            <DatePicker
                selected={selected}
                onChange={onChange}
                dateFormat={dateFormat}
                className={`
                    w-full
                    border
                    rounded-lg
                    px-4
                    py-3
                    outline-none
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

export default FormDatePicker;