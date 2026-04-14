import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dropdown({
    options,
    value=undefined,
    onChange=null,
}) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={onChange || undefined}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-600 appearance-none"
            >
                {options.map(option => (
                    <option key={option.value || option} value={option.value || option}>
                        {option.label || option}
                    </option>
                ))}
            </select>
            
            {/* Custom arrow */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <FontAwesomeIcon icon="fa-solid fa-angle-down" className='text-gray-500 text-md' />
            </div>
        </div>
    );
}

export default Dropdown;