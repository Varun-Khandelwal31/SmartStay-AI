function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-5 text-center sm:px-6 sm:py-6 lg:px-8">
        <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
          &copy; {new Date().getFullYear()} SmartStay AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
