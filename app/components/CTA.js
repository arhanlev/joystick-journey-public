'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import styles from './CTA.module.css'

export default function CTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.glow} />

      <div className={styles.images}>
        <motion.div
          className={styles.imgWrap}
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={inView ? { opacity: 1, y: 0, rotate: -3 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image src="/Mazes4.png" alt="Joystick Journey" fill style={{ objectFit: 'cover', borderRadius: '6px' }} />
        </motion.div>
        <motion.div
          className={`${styles.imgWrap} ${styles.imgWrapLarge}`}
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 2 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <Image src="/Retro.png" alt="Joystick Journey" fill style={{ objectFit: 'cover', borderRadius: '6px' }} />
        </motion.div>
        <motion.div
          className={styles.imgWrap}
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          animate={inView ? { opacity: 1, y: 0, rotate: -1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Image src="/MazeHolder.png" alt="Joystick Journey" fill style={{ objectFit: 'cover', borderRadius: '6px' }} />
        </motion.div>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.label}>Ready to play?</div>
        <h2 className={styles.title}>
          Start your<br /><em>journey</em><br />today.
        </h2>
        <p className={styles.sub}>
          The Starter Kit includes the base unit, joystick, and 4 maze boards. Everything you need to get rolling — literally. Starting at just $15.99.
        </p>
        <div className={styles.actions}>
          <Link href="/shop" className={styles.btnPrimary}>Shop Now — $15.99</Link>
          <Link href="/tutorial" className={styles.btnSecondary}>Watch Tutorial</Link>
        </div>
        <div className={styles.trust}>
          <span>🚚 Ships in 3-5 days</span>
          <span>✉️ officaljoystickjourney@gmail.com</span>
          <span>🔒 Secure checkout</span>
        </div>
      </motion.div>
    </section>
  )
}