function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-slate-600">
          &copy; {new Date().getFullYear()} SmartStay AI. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
