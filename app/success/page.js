import Link from 'next/link'
import styles from './success.module.css'

export default function SuccessPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.sub}>
          Thank you for your purchase! Your Joystick Journey is on its way. You'll receive a confirmation email shortly.
        </p>
        <div className={styles.info}>
          <p>📦 Ships in 3-5 business days</p>
          <p>📧 Questions? joystickjourney@gmail.com</p>
        </div>
        <Link href="/" className={styles.btn}>Back to Home</Link>
      </div>
    </div>
  )
}