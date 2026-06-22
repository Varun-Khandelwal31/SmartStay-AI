function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 text-white dark:from-indigo-800 dark:via-indigo-900 dark:to-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-200 sm:mb-3 sm:text-sm lg:text-base">
            Intelligent Hospitality
          </p>
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Smarter stays for modern travelers
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-indigo-100 sm:mt-4 sm:text-base lg:text-lg">
            SmartStay AI helps hotels deliver personalized guest experiences with
            real-time insights, seamless check-ins, and data-driven operations.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
