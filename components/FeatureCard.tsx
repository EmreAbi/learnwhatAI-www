'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface FeatureCardProps {
  icon: string
  title: string
  items: string[]
  description?: string
  image?: string
  delay?: number
}

export default function FeatureCard({
  icon,
  title,
  items,
  description,
  image,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow"
    >
      {image && (
        <div className="mb-6 rounded-xl overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start gap-3 mb-4">
        <span className="text-3xl" role="img" aria-label={icon}>
          {icon}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-brand-navy flex-1">
          {title}
        </h3>
      </div>

      {description && (
        <p className="text-brand-gray mb-4 leading-relaxed">{description}</p>
      )}

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
