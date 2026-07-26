import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Card from '../components/Card.jsx'
import Footer from '../components/Footer.jsx'

const homestays = [
  {
    title: 'Serenade Mountain Haven',
    location: 'Manali, Himachal Pradesh',
    description: 'A cozy timber homestay nestled amid pine forests with panoramic Himalayan views, private fireplace, and artisanal breakfast.',
    tag: 'Mountain View',
    rating: '4.95',
    price: '185',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Fireplace', 'Organic Breakfast', 'Mountain Trekking'],
  },
  {
    title: 'Azure Palms Beach Villa',
    location: 'North Goa',
    description: 'Private 3-bedroom beachfront bungalow featuring an infinity plunge pool, lush tropical gardens, and personal butler service.',
    tag: 'Beachfront',
    rating: '4.98',
    price: '310',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Pool', 'Ocean Front', 'Chef on Request', 'Sunset Deck'],
  },
  {
    title: 'The Heritage Courtyard',
    location: 'Udaipur, Rajasthan',
    description: 'Restored 200-year-old Haveli combining traditional Rajasthani architecture with modern smart room controls and rooftop dining.',
    tag: 'Heritage',
    rating: '4.92',
    price: '240',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Heritage Courtyard', 'Rooftop Dining', 'Spa & Wellness', 'Airport Shuttle'],
  },
]

const features = [
  {
    title: 'AI Sentiment Intelligence',
    description: 'Automatically analyze guest reviews in real time using Google Gemini API. Detect underlying emotions, extract key hospitality issues, and generate instant empathetic manager responses.',
    tag: 'AI Analytics',
  },
  {
    title: 'Smart Guest Operations',
    description: 'Streamline arrivals, manage house rules, and track property check-ins efficiently across single or multi-property homestays.',
    tag: 'Operations',
  },
  {
    title: 'Guest Satisfaction Boost',
    description: 'Turn feedback into actionable house improvements. Monitor occupancy trends and room ratings with interactive dashboard analytics.',
    tag: 'Growth',
  },
]

const amenities = [
  { icon: '☕', title: 'Artisanal Breakfast', desc: 'Fresh local farm-to-table morning meals' },
  { icon: '🏊‍♂️', title: 'Private Pools & Spas', desc: 'Temperature controlled infinity pools' },
  { icon: '🔐', title: 'Smart Keyless Access', desc: 'Contactless PIN & mobile entry' },
  { icon: '📶', title: 'High-Speed Wi-Fi', desc: 'Dedicated 500Mbps optical fiber connection' },
]

function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* Featured Homestays Section */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Curated Collection
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                Featured Homestays & Stays
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                Discover handpicked boutique homestays offering authentic hospitality, luxury amenities, and memorable experiences.
              </p>
            </div>
            <Link
              to="/showcase"
              className="inline-flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              View All Showcase Stays →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homestays.map((stay) => (
              <Card
                key={stay.title}
                title={stay.title}
                description={stay.description}
                tag={stay.tag}
                location={stay.location}
                rating={stay.rating}
                price={stay.price}
                image={stay.image}
                amenities={stay.amenities}
              />
            ))}
          </div>
        </section>

        {/* Why SmartStay AI Section */}
        <section className="border-t border-slate-200/80 bg-white py-12 dark:border-slate-800/80 dark:bg-slate-900 sm:py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Next-Gen Hospitality Tech
              </span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
                Why SmartStay AI powers better stays
              </h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
                Hospitality excellence meets artificial intelligence. Empowering hosts and hotel operations with data-driven insights.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  title={feature.title}
                  description={feature.description}
                  tag={feature.tag}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Homestay Amenities Grid */}
        <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl lg:text-3xl">
              Signature Homestay Amenities
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Designed for luxury comfort, high work-from-anywhere bandwidth, and peaceful relaxation.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-2xl dark:bg-indigo-950/60">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-action Banner */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 p-8 text-white shadow-2xl sm:p-12">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Ready to elevate your homestay experience?
              </h2>
              <p className="mt-3 text-sm text-indigo-100 sm:text-base">
                Join host owners leveraging SmartStay AI to monitor guest feedback, automate responses, and improve hospitality rankings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-900 shadow-md transition-all hover:bg-indigo-50"
                >
                  Create Account
                </Link>
                <Link
                  to="/ai-review"
                  className="rounded-xl border border-indigo-300/40 bg-indigo-900/40 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-indigo-800/60"
                >
                  Analyze Feedback Now
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

export default Home
