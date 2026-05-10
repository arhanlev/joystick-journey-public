'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Features.module.css'

const features = [
  {
    title: 'Precision Joystick Control',
    desc: 'Tilt the maze with a responsive analog joystick — smooth, satisfying, and surprisingly addictive.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="3"/>
        <line x1="12" y1="11" x2="12" y2="20"/>
        <line x1="8" y1="16" x2="16" y2="16"/>
      </svg>
    )
  },
  {
    title: 'Swappable Maze Boards',
    desc: 'The maze detaches in seconds. Swap between different boards to unlock new layouts and fresh challenges every time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="8" height="8" rx="1"/>
        <rect x="13" y="3" width="8" height="8" rx="1"/>
        <rect x="3" y="13" width="8" height="8" rx="1"/>
        <rect x="13" y="13" width="8" height="8" rx="1"/>
      </svg>
    )
  },
  {
    title: 'Grows With You',
    desc: 'Collect new mazes, compete for best times, or design your own. Joystick Journey is a platform, not just a product.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/>
      </svg>
    )
  },
  {
    title: 'All Ages Welcome',
    desc: 'Simple enough for kids, deep enough for adults. Starter boards ease beginners in while expert layouts challenge seasoned players.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    )
  },
  {
    title: 'Premium Build Quality',
    desc: 'Solid materials, tight tolerances, and a design that feels gift-worthy straight out of the box. Made to be kept and shared.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    )
  },
  {
    title: 'Race a Buddy',
    desc: 'Multiplayer race mode coming soon with built-in timer and luxury design. See who can maze the smartest, fastest, and best',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    )
  }
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className={styles.iconWrap}>{feature.icon}</div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
      <div className={styles.cardLine} />
    </motion.div>
  )
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} id="features">
      <div className={styles.header} ref={ref}>
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What makes it special
        </motion.div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Built different,<br />built to <em>delight.</em>
        </motion.h2>
        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Every detail of Joystick Journey is designed with play in mind — from the satisfying click of the joystick to the snap of a fresh maze locking into place.
        </motion.p>
      </div>

      <div className={styles.grid}>
        {features.map((f, i) => (
          <FeatureCard key={i} feature={f} index={i} />
        ))}
      </div>
    </section>
  )
}