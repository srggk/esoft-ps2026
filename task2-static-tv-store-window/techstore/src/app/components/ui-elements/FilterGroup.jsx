function FilterGroup({
    children,
    label='',
    className='',
}) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-900 mb-2">
                {label}
            </label>
            {children}
        </div>
    );
}

export default FilterGroup;