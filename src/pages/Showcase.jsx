import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { Button, Input, Modal, Toast, Loader } from '../components/ui'

function Showcase() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' })
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const showToast = (message, type) => {
    setToast({ isVisible: true, message, type })
    setTimeout(() => setToast((prev) => ({ ...prev, isVisible: false })), 3000)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
    if (emailError) setEmailError('')
  }

  const validateEmail = () => {
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address.')
      showToast('Validation failed. Check the email field.', 'error')
      return
    }
    showToast('Email validated successfully!', 'success')
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            UI Component Showcase
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
            A demonstration of all reusable UI components built for SmartStay AI.
          </p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {/* Buttons */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Buttons
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </section>

          {/* Inputs */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Inputs
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <Input label="Guest Name" placeholder="Enter guest name" />
              <Input
                label="Email Address"
                type="email"
                placeholder="guest@example.com"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
              />
              <Input label="Room Number" placeholder="e.g. 204" />
              <Input label="Password" type="password" placeholder="Enter password" disabled />
            </div>
            <div className="mt-4">
              <Button onClick={validateEmail}>Validate Email</Button>
            </div>
          </section>

          {/* Modal */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Modal
            </h2>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Booking Confirmation"
            >
              <p>
                Your reservation for Room 204 has been confirmed. A confirmation
                email will be sent to the guest shortly.
              </p>
              <div className="mt-4 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
              </div>
            </Modal>
          </section>

          {/* Toast */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Toast
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button onClick={() => showToast('Check-in completed!', 'success')}>
                Success Toast
              </Button>
              <Button variant="danger" onClick={() => showToast('Payment failed.', 'error')}>
                Error Toast
              </Button>
              <Button variant="outline" onClick={() => showToast('New booking received.', 'info')}>
                Info Toast
              </Button>
              <Button variant="secondary" onClick={() => showToast('Room maintenance due.', 'warning')}>
                Warning Toast
              </Button>
            </div>
          </section>

          {/* Loader */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
              Loader
            </h2>
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center gap-2">
                <Loader size="sm" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader size="md" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader size="lg" />
                <span className="text-xs text-slate-500 dark:text-slate-400">Large</span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  )
}

export default Showcase
