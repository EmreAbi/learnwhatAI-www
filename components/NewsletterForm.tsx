"use client"

import { useState } from 'react'

export default function NewsletterForm({ title }: { title: string }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically handle the form submission, e.g., send to an API
    alert(`Thanks for subscribing with ${email}! (This is a demo)`)
    setEmail('')
  }

  return (
    <div>
      <h3 className="font-bold mb-4">{title || 'Stay Updated'}</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded-lg text-brand-navy"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="w-full bg-brand-orange text-white px-4 py-2 rounded-lg font-semibold hover:brightness-95 transition-all"
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
