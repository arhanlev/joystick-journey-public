'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Hero.module.css'



export default function Hero() {
  const [showMazes, setShowMazes] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
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
        ctx.fillStyle = `rgba(200, 121, 26, ${p.opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        <motion.div
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.dot} />
          The maze. Reimagined.
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Play it your<br /><em>own way.</em>
        </motion.h1>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A precision joystick-controlled marble maze with modular, swappable boards. One base, endless challenges — designed for every age, built to last.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/shop" className={styles.btnPrimary}>Shop Now</Link>
          <Link href="/how-it-works" className={styles.btnSecondary}>How It Works</Link>
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className={styles.stat}>
            <span>4+</span>
            <p>Maze Boards</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span>1</span>
            <p>Joystick Base</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span>∞</span>
            <p>Challenges</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.imageWrapper}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className={styles.imageGlow} />
        <img
          src="/Wholeshot.png"
          alt="Joystick Journey"
          className={styles.productImage}
        />
        <div className={styles.floatBadge} onClick={() => setShowMazes(true)}>
        <span>Click here to swap maze</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8791A" strokeWidth="2">
          <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
        </svg>
      </div>

{showMazes && (
  <div className={styles.mazeOverlay} onClick={() => setShowMazes(false)}>
    <div className={styles.mazeModal} onClick={e => e.stopPropagation()}>
      <button className={styles.mazeClose} onClick={() => setShowMazes(false)}>✕</button>
      <div className={styles.mazeModalHeader}>
        <p className={styles.mazeModalLabel}>Maze Collection</p>
        <h3 className={styles.mazeModalTitle}>Choose your <em>challenge.</em></h3>
        <p className={styles.mazeModalSub}>Each board snaps in and out in seconds. Collect them all.</p>
      </div>
      <div className={styles.mazeGrid}>
        {[
          { file: 'Mazes4.png', name: 'Starter Pack' },
          { file: 'MazeLevels.png', name: 'Levels' },
          { file: 'Grain.png', name: 'Grain' },
          { file: 'warp.png', name: 'Warp' },
          { file: 'concentric.png', name: 'Concentric' },
          { file: 'tsa.png', name: 'TSA' },
        ].map((maze, i) => (
          <div key={i} className={styles.mazeCard}>
            <div className={styles.mazeCardImage}>
              <img src={`/${maze.file}`} alt={maze.name} />
            </div>
            <p className={styles.mazeName}>{maze.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
      </motion.div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  )
}