function Card({ title, description, tag }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {tag && (
        <span className="mb-3 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
          {tag}
        </span>
      )}
      <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>
    </article>
  )
}

export default Card
