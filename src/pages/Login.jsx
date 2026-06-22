import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Login() {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white dark:bg-slate-900">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
          Login
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-base lg:text-lg">
          Staff and admin sign-in will be available here. For now, this page
          serves as a routing placeholder while authentication is developed in
          a future milestone.
        </p>
      </main>
      <Footer />
    </div>
  )
}

export default Login
