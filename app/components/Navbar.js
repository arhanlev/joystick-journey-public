'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Navbar.module.css'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
                <Link href="/" className={styles.logo}>
  <img src="/logo1.png" alt="Joystick Journey" className={styles.logoImg} />
  Joystick <span>Journey</span>
</Link>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
        <li><Link href="/features" className={pathname === '/features' ? styles.activeLink : ''}>Features</Link></li>
        <li><Link href="/how-it-works" className={pathname === '/how-it-works' ? styles.activeLink : ''}>How It Works</Link></li>
        <li><Link href="/tutorial" className={pathname === '/tutorial' ? styles.activeLink : ''}>Tutorial</Link></li>
        <li><Link href="/shop" className={pathname === '/shop' ? styles.activeLink : ''}>Shop</Link></li>
      </ul>

      <Link href="/shop" className={styles.navCta}>Order Now</Link>

      <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? styles.barOpen : ''}></span>
        <span className={menuOpen ? styles.barOpen : ''}></span>
        <span className={menuOpen ? styles.barOpen : ''}></span>
      </button>
    </nav>
  )
}