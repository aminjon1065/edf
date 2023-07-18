const Input = ({ disabled = false, className, ...props }) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring-1 focus:ring-indigo-600 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
