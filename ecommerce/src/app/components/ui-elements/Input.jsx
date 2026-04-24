function Input({
    type='text',
    placeholder='',
    min=undefined,
    max=undefined,
    value=undefined,
    onChange=null,
    isDisable=false,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            value={value}
            onChange={onChange || undefined}
            disabled={isDisable}
            className={`w-full px-3 py-2 rounded-lg 
                bg-gray-100 border border-gray-300 text-gray-600
                focus:outline-none focus:border-gray-900 
                ${isDisable ?? "disabled:opacity-50 cursor-not-allowed"}`}
        />
    );
}

export default Input;