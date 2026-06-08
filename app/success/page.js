'use client'
import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './success.module.css'

function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let animId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,121,26,${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => cancelAnimationFrame(animId)
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [emailSent, setEmailSent] = useState(false)
  const [orderNum] = useState(() => Math.floor(Math.random() * 90000) + 10000)

  useEffect(() => {
    if (sessionId && !emailSent) {
      fetch('/api/get-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.email) {
          fetch('/api/send-confirmation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerEmail: data.email,
              customerName: data.name,
              orderDetails: {
                name: data.productName,
                price: data.total,
                description: data.description,
              }
            })
          })
          setEmailSent(true)
        }
      })
      .catch(err => console.error('Error:', err))
    }
  }, [sessionId])

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top amber line */}
      <div className={styles.cardTopLine} />

      {/* Icon */}
      <motion.div
        className={styles.iconWrap}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <span className={styles.iconEmoji}>🎉</span>
        <div className={styles.iconRing} />
        <div className={styles.iconRing2} />
      </motion.div>

      {/* Order number */}
      <motion.div
        className={styles.orderBadge}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Order #JJ{orderNum}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <h1 className={styles.title}>Your journey<br /><em>begins now.</em></h1>
        <p className={styles.sub}>
          Thank you for your order! We're putting your Joystick Journey together with care. Expect it at your door in 1-2 weeks — and keep an eye on your inbox for your confirmation email.
        </p>
      </motion.div>

      {/* Order status steps */}
      <motion.div
        className={styles.steps}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className={styles.step}>
          <div className={`${styles.stepDot} ${styles.stepDotActive}`}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3">
              <polyline points="20,6 9,17 4,12"/>
            </svg>
          </div>
          <div className={styles.stepContent}>
            <p className={styles.stepTitle}>Order Confirmed</p>
            <p className={styles.stepDesc}>Payment processed successfully</p>
          </div>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div className={styles.stepDot}>
            <div className={styles.stepDotInner} />
          </div>
          <div className={styles.stepContent}>
            <p className={styles.stepTitle}>Being Assembled</p>
            <p className={styles.stepDesc}>Your maze is being prepared</p>
          </div>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div className={styles.stepDot} />
          <div className={styles.stepContent}>
            <p className={styles.stepTitle}>On Its Way</p>
            <p className={styles.stepDesc}>Ships within 1-2 weeks</p>
          </div>
        </div>
      </motion.div>

      {/* Info */}
      <motion.div
        className={styles.info}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85, duration: 0.6 }}
      >
        <div className={styles.infoRow}>
          <span>📧</span>
          <p>Check your spam folder if you don't see the confirmation email</p>
        </div>
        <div className={styles.infoDivider} />
        <div className={styles.infoRow}>
          <span>✉️</span>
          <p>Questions? <a href="mailto:officialjoystickjourney@gmail.com">officialjoystickjourney@gmail.com</a></p>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className={styles.actions}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link href="/" className={styles.btnPrimary}>Back to Home</Link>
        <Link href="/shop" className={styles.btnSecondary}>Shop More</Link>
      </motion.div>

      {/* Socials */}
      <motion.p
        className={styles.socials}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        Follow us <span>@officialjoystickjourney</span> on TikTok & Instagram
      </motion.p>
    </motion.div>
  )
}

export default function SuccessPage() {
  return (
    <div className={styles.page}>
      <Particles />
      <div className={styles.glow} />
      <Suspense fallback={
        <div className={styles.card}>
          <div className={styles.iconEmoji}>⏳</div>
          <h1 className={styles.title}>Loading...</h1>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
}