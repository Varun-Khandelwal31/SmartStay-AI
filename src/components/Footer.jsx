function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="text-sm text-slate-600">
          &copy; {new Date().getFullYear()} SmartStay AI. All rights reserved.
        </p>
        <p className="text-sm text-slate-500">Week 2 Frontend Skeleton</p>
      </div>
    </footer>
  )
}

export default Footer
