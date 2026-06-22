import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const stats = [
  { label: 'Occupancy Rate', value: '87%', change: '+4% from yesterday' },
  { label: 'Check-ins Today', value: '42', change: '12 pending arrivals' },
  { label: 'Active Guests', value: '156', change: 'Across 3 properties' },
  { label: 'Open Alerts', value: '3', change: '1 maintenance, 2 service' },
]

const recentActivity = [
  { guest: 'Sarah Mitchell', action: 'Checked in to Room 312', time: '10 min ago' },
  { guest: 'James Chen', action: 'Requested late checkout', time: '25 min ago' },
  { guest: 'Room 205', action: 'Housekeeping completed', time: '1 hr ago' },
  { guest: 'David Park', action: 'New reservation confirmed', time: '2 hr ago' },
]

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            Overview of hotel operations, guest activity, and daily metrics.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mb-8 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:p-5"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400 sm:text-sm">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:mt-2 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Recent Activity
            </h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentActivity.map((item) => (
                <li
                  key={item.guest + item.time}
                  className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white sm:text-base">
                      {item.guest}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                      {item.action}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500 dark:text-slate-500 sm:text-sm">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Quick Summary
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
              The dashboard will display occupancy metrics, guest activity, and
              operational alerts. This placeholder section will be replaced with
              live data widgets in a later sprint.
            </p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800 sm:px-4 sm:py-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  Rooms Available
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                  18
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800 sm:px-4 sm:py-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  Avg. Stay Duration
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                  2.4 nights
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800 sm:px-4 sm:py-3">
                <span className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">
                  Guest Satisfaction
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white sm:text-base">
                  4.8 / 5
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
