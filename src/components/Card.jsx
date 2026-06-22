function Card({ title, description, tag }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      {tag && (
        <span className="mb-2 w-fit rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 sm:mb-3 sm:px-3 sm:py-1">
          {tag}
        </span>
      )}
      <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg lg:text-xl">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
        {description}
      </p>
    </article>
  )
}

export default Card
