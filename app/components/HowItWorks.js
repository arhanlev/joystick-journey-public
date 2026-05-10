'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    title: 'Choose your maze',
    desc: 'Select from included boards or pick up expansion packs. Each maze snaps cleanly into the base with a satisfying click. This custom Maze Holder can attach or detach to your preference with our magnetic locking system.',
    image: '/MazeHolder.png'
  },
  {
    num: '02',
    title: 'Grip the joystick',
    desc: 'The analog joystick gives you precise, fluid control over the maze angle. Guide your marble through every twist and trap.',
    image: '/Joystick_Zoom.png'
  },
  {
    num: '03',
    title: 'Swap & repeat',
    desc: 'Detach the maze board in seconds and slot in a new one. Keep the challenge fresh without buying a whole new game.',
    image: '/Mazes4.png'
  }
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className={styles.section} id="how">
      <div className={styles.header} ref={ref}>
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          How it works
        </motion.div>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Three things.<br /><em>Infinite play.</em>
        </motion.h2>
      </div>

      <div className={styles.layout}>
        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`${styles.step} ${activeStep === i ? styles.active : ''}`}
              onClick={() => setActiveStep(i)}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <div className={styles.stepLeft}>
                <span className={styles.num}>{step.num}</span>
                <div className={`${styles.stepLine} ${activeStep === i ? styles.stepLineActive : ''}`} />
              </div>
              <div className={styles.stepContent}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
              <div className={styles.stepArrow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image */}
        <motion.div
          className={styles.imageWrap}
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.imageGlow} />
          <div className={styles.imageInner}>
            <Image
              src={steps[activeStep].image}
              alt={steps[activeStep].title}
              fill
              style={{ objectFit: 'cover', borderRadius: '6px' }}
            />
          </div>
          <div className={styles.stepLabel}>
            <span>{steps[activeStep].num}</span>
            <p>{steps[activeStep].title}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}