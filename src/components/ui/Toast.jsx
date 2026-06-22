/**
 * Toast component for temporary notifications.
 *
 * @param {Object} props
 * @param {string} props.message - Notification message text
 * @param {'success'|'error'|'info'|'warning'} [props.type='info'] - Toast style variant
 * @param {boolean} props.isVisible - Controls toast visibility
 * @param {function} [props.onClose] - Called when the close button is clicked
 * @param {string} [props.className=''] - Additional CSS classes
 */
function Toast({ message, type = 'info', isVisible, onClose, className = '' }) {
  if (!isVisible) return null

  const typeStyles = {
    success:
      'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    error:
      'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
    info:
      'border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300',
    warning:
      'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
  }

  return (
    <div
      role="alert"
      className={`fixed bottom-4 left-4 right-4 z-50 mx-auto flex max-w-sm items-start justify-between gap-3 rounded-lg border px-4 py-3 shadow-lg sm:left-auto sm:right-6 ${typeStyles[type]} ${className}`}
    >
      <p className="flex-1 text-sm font-medium sm:text-base">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
          aria-label="Dismiss notification"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Toast
