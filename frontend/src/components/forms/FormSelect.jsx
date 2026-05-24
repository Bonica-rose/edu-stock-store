import Select from "react-select";

const FormSelect = ({
    options = [],
    value,
    onChange,
    placeholder = "Select...",
    isClearable = true,
    isSearchable = true,
    ...props
}) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable={isSearchable}
            unstyled
            classNames={{
                control: ({ isFocused }) =>
                    `w-full rounded-lg border bg-white px-3 py-2 min-h-[20px]
                    transition-all
                    ${
                        isFocused
                            ? "border-gray-400 ring-2 ring-indigo-200"
                            : "border-gray-400"
                    }`,

                placeholder: () => "text-gray-400",
                valueContainer: () => "text-gray-700",
                input: () => "text-gray-700",
                singleValue: () => "text-gray-700",
                menu: () =>
                    "overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50 mt-1",
                option: ({ isFocused, isSelected }) =>
                    `px-3 py-2 cursor-pointer transition-colors
                    ${
                        isSelected
                            ? "bg-lime-200 text-gray-900"
                            : isFocused
                            ? "bg-indigo-50 text-gray-900"
                            : "bg-white text-gray-700"
                    }`,
            }}
            {...props}
        />
    );
};

export default FormSelect;