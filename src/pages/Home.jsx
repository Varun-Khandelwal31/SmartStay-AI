import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'

const features = [
  {
    title: 'Guest Insights',
    description:
      'Understand guest preferences and behavior patterns to deliver tailored recommendations and improve satisfaction scores.',
    tag: 'Analytics',
  },
  {
    title: 'Smart Check-In',
    description:
      'Streamline arrivals with digital check-in flows that reduce front-desk wait times and keep operations running smoothly.',
    tag: 'Operations',
  },
  {
    title: 'Revenue Optimization',
    description:
      'Use demand signals and occupancy trends to adjust pricing strategies and maximize revenue across every room type.',
    tag: 'Growth',
  },
]

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
              Why SmartStay AI
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Explore the core capabilities that power smarter hospitality
              experiences for guests and hotel teams alike.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                title={feature.title}
                description={feature.description}
                tag={feature.tag}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
