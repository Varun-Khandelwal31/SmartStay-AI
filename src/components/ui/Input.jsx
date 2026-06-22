/**
 * Input component for form fields.
 *
 * @param {Object} props
 * @param {string} [props.label] - Label text displayed above the input
 * @param {string} [props.type='text'] - HTML input type
 * @param {string} [props.placeholder=''] - Placeholder text
 * @param {string} [props.value] - Controlled input value
 * @param {function} [props.onChange] - Change handler
 * @param {string} [props.error=''] - Error message displayed below the input
 * @param {boolean} [props.disabled=false] - Disables the input
 * @param {string} [props.id] - HTML id attribute
 * @param {string} [props.name] - HTML name attribute
 * @param {string} [props.className=''] - Additional CSS classes for the wrapper
 */
function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  disabled = false,
  id,
  name,
  className = '',
}) {
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 ${
          error
            ? 'border-red-500 focus:ring-red-500 dark:border-red-400'
            : 'border-slate-300 dark:border-slate-600'
        }`}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}

export default Input
