'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './success.module.css'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [emailSent, setEmailSent] = useState(false)

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
    }
  }, [sessionId])

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.sub}>
          Thank you for your purchase! Your Joystick Journey is on its way. Check your email for a confirmation from us.
        </p>
        <div className={styles.info}>
          <p>📦 Ships in 1-2 weeks</p>
          <p>📧 joystickjourney@gmail.com</p>
        </div>
        <Link href="/" className={styles.btn}>Back to Home</Link>
      </div>
    </div>
  )
}