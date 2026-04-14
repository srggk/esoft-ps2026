function Input({
    type='text',
    placeholder='',
    min=undefined,
    max=undefined,
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            min={min}
            max={max}
            className="w-full px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:border-gray-900 text-gray-600"
        />
    );
}

export default Input;