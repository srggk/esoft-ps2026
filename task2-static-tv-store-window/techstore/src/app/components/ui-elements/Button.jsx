function Button({
    children,
    variant='default',
    size = 'md', // 'sm', 'md', 'lg'
    isSubmit=false,
    onClick=null,
    isFullWeight=false,
    isIconOnly=false,
    className = '',
}) {
    const variantStyles = {
        default: "bg-gray-100 hover:bg-gray-200 text-gray-900",
        light: "bg-transparent",
        dark: "bg-gray-900 hover:bg-gray-700 text-white",
        white: "bg-white hover:bg-gray-200 text-gray-900",
        danger: "bg-red-600 hover:bg-red-500 text-white"
    };

    const sizeStyles = {
        sm: isIconOnly ? "p-1 w-8 h-8" : "px-3 py-1 text-sm",
        md: isIconOnly ? "p-2 w-10 h-10" : "px-4 py-2",
        lg: isIconOnly ? "p-3 w-12 h-12" : "px-6 py-3 text-lg",
    };

    return (
        <button
            type={isSubmit ? "submit" : "button"}
            onClick={onClick || undefined}
            className={`font-medium rounded-lg transition
                ${isFullWeight ? "w-full" : "w-auto"}
                ${isIconOnly && "aspect-square"}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}`
            }
        >
            {children}
        </button>
    );
}

export default Button;