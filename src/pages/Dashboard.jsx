import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Dashboard</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          The dashboard will display occupancy metrics, guest activity, and
          operational alerts. This placeholder section will be replaced with
          live data widgets in a later sprint.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
