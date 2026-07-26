function Card({ title, description, tag, image, location, rating, price, amenities }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {image && (
        <div className="relative h-48 w-full overflow-hidden sm:h-52">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          {tag && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-900 backdrop-blur-md shadow-sm dark:bg-slate-900/90 dark:text-indigo-300">
              {tag}
            </span>
          )}
          {price && (
            <span className="absolute bottom-3 right-3 rounded-xl bg-indigo-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-md shadow-md">
              ${price} <span className="text-[10px] font-normal opacity-90">/ night</span>
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {!image && tag && (
          <span className="mb-3 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            {tag}
          </span>
        )}

        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {title}
          </h3>
          {rating && (
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
              <span>★</span> {rating}
            </div>
          )}
        </div>

        {location && (
          <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <svg className="h-3.5 w-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        )}

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>

        {amenities && amenities.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
            {amenities.map((item, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default Card
