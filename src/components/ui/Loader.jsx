/**
 * Loader component for loading states.
 *
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Spinner size
 * @param {boolean} [props.fullScreen=false] - Centers loader in a full-screen overlay
 * @param {string} [props.label='Loading...'] - Accessible label for screen readers
 * @param {string} [props.className=''] - Additional CSS classes
 */
function Loader({ size = 'md', fullScreen = false, label = 'Loading...', className = '' }) {
  const sizes = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  }

  const spinner = (
    <div
      role="status"
      aria-label={label}
      className={`animate-spin rounded-full border-indigo-600 border-t-transparent dark:border-indigo-400 ${sizes[size]} ${className}`}
    />
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default Loader
