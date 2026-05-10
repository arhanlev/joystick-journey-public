'use client'
import { useState } from 'react'
import Image from 'next/image'
import styles from './shop.module.css'
import Link from 'next/link'


const images = [
  '/Wholeshot.png',
  '/Mazes4.png',
  '/MazeHolder.png',
  '/MazesAllcolors.png',
  '/Joystick-Colors.png',
  '/SameColor.png',
  '/MazeLevels.png'
  
]

const colors = ['White', 'Red', 'Blue', 'Green', 'Black']
const colorHex = {
  White: '#F5F5F5',
  Red: '#D94040',
  Blue: '#3A7BD5',
  Green: '#3DAA6A',
  Black: '#1A1A1A',
}

const joystickColors = ['Standard', 'Red', 'Black', 'Green', 'Blue', 'Retro']
const joystickHex = {
  Standard: '#F5F5F5',
  Red: '#D94040',
  Black: '#1A1A1A',
  Green: '#3DAA6A',
  Blue: '#3A7BD5',
}



const accordionItems = [
  {
    title: "What's included",
    content: 'Joystick Journey base unit, joystick controller, 4 swappable maze boards, five 4.5 mm precision steel marbles, and a quick-start guide.'
  },
  {
    title: 'Shipping info',
    content: 'Ships in 3-5 business days. Free shipping on orders over $35. For questions email officaljoystickjourney@gmail.com'
  },
  {
    title: 'Maze bundle details',
    content: 'The bundle includes 5 additional maze boards on top of the 4 already included — giving you 9 unique mazes total. New mazes released regularly.'
  },
  {
    title: 'Contact & support',
    content: 'Have a question? Reach us at officialjoystickjourney@gmail.com — we typically respond within 24 hours. You can also follow us on TikTok @officialjoystickjourney and Instagram @officialjoystickjourney for updates, new maze drops, and more!'

  }
]

export default function ShopPage() {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('White')
  const [selectedJoystick, setSelectedJoystick] = useState('Standard')
  const [bundle, setBundle] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showRetro, setShowRetro] = useState(false)

  const basePrice = 15.99
  const bundlePrice = 20.99
  const joystickAddon = selectedJoystick !== 'Standard' ? 1.99 : 0
  const total = ((bundle ? bundlePrice : basePrice) + joystickAddon) * quantity

  const handleCheckout = async () => {
    setLoading(true)
    const items = [
      {
        name: bundle ? 'Joystick Journey Bundle (9 Mazes)' : 'Joystick Journey Starter Kit (4 Mazes)',
        description: `Color: ${selectedColor} | Joystick: ${selectedJoystick}`,
        price: bundle ? 20.99 : 15.99,
        quantity,
      },
      ...(selectedJoystick !== 'Standard' ? [{
        name: 'Colored Joystick Add-on',
        description: `Joystick color: ${selectedJoystick}`,
        price: 1.99,
        quantity,
      }] : [])
    ]

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items,
        customerInfo: {
          name: '',
          email: '',
          color: selectedColor,
          joystickColor: selectedJoystick,
          bundle: String(bundle),
        }
      })
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>

      {/* Retro Modal */}
      {showRetro && (
        <div className={styles.retroOverlay} onClick={() => setShowRetro(false)}>
          <div className={styles.retroModal} onClick={e => e.stopPropagation()}>
            <button className={styles.retroClose} onClick={() => setShowRetro(false)}>✕</button>
            <div className={styles.retroImageWrap}>
              <Image src="/Retro.png" alt="Retro Joystick" fill style={{ objectFit: 'cover', borderRadius: '6px 6px 0 0' }} />
            </div>
            <div className={styles.retroInfo}>
              <p className={styles.retroTitle}>Retro Edition Joystick</p>
              <p className={styles.retroDesc}>A colorway inspired by classic arcade machines. Pairs beautifully with any maze color.</p>
              <span className={styles.addonTag}>+$1.99</span>
            </div>
          </div>
        </div>
      )}

      {/* LEFT - Images */}
      <div className={styles.imageSection}>
        <div className={styles.mainImage}>
          <Image
            src={images[activeImage]}
            alt="Joystick Journey"
            fill
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        </div>
        <div className={styles.thumbnails}>
          {images.map((img, i) => (
            <div
              key={i}
              className={`${styles.thumb} ${activeImage === i ? styles.thumbActive : ''}`}
              onClick={() => setActiveImage(i)}
            >
              <Image src={img} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT - Info */}
      
      <div className={styles.infoSection}>
       <Link 
  href="/" 
  className={styles.backBtn} 
  style={{ color: 'rgba(245, 240, 232, 0.3)' }}
  onMouseEnter={e => e.currentTarget.style.color = '#C8791A'}
  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245, 240, 232, 0.3)'}
>
  ← Back to Home
</Link>
        <p className={styles.eyebrow}>Joystick Journey</p>
        <h1 className={styles.title}>Marble Maze <span>Starter Kit</span></h1>

        <div className={styles.price}>
          ${bundle ? bundlePrice.toFixed(2) : basePrice.toFixed(2)}
          {joystickAddon > 0 && <span className={styles.addon}> + $1.99 joystick color</span>}
        </div>

        <p className={styles.desc}>
          A precision joystick-controlled marble maze with modular, swappable boards. One base, endless challenges — designed for every age, built to last. Comes with five 4.5mm marbles included for free.
        </p>

        {/* Maze Color */}
        <div className={styles.optionGroup}>
          <p className={styles.optionLabel}>Color: <strong>{selectedColor}</strong></p>
          <div className={styles.colorRow}>
            {colors.map(c => (
              <button
                key={c}
                className={`${styles.colorBtn} ${selectedColor === c ? styles.colorActive : ''}`}
                style={{ background: colorHex[c] }}
                onClick={() => setSelectedColor(c)}
                title={c}
              />
            ))}
          </div>
        </div>

        {/* Joystick Color */}
        <div className={styles.optionGroup}>
          <p className={styles.optionLabel}>
            Joystick Color: <strong>{selectedJoystick}</strong>
            {selectedJoystick !== 'Standard' && <span className={styles.addonTag}>+$1.99</span>}
          </p>
          <div className={styles.colorRow}>
  {joystickColors.map(j => (
    <button
      key={j}
      className={`${styles.colorBtn} ${selectedJoystick === j ? styles.colorActive : ''} ${j === 'Retro' ? styles.retroBtn : ''}`}
      style={{ 
        background: j === 'Retro' ? 'linear-gradient(90deg, #D94040 50%, #888888 50%)' : joystickHex[j],
        border: j === 'Standard' ? '2px dashed #555' : '' 
      }}
      onClick={() => {
        setSelectedJoystick(j)
        if (j === 'Retro') setShowRetro(true)
      }}
      title={j}
    />
  ))}
</div>
          <p className={styles.optionHint}>Standard = same color as your maze</p>
        </div>

        {/* Bundle */}
        <div className={styles.optionGroup}>
          <p className={styles.optionLabel}>Bundle:</p>
          <div className={styles.bundleRow}>
            <button
              className={`${styles.bundleBtn} ${!bundle ? styles.bundleActive : ''}`}
              onClick={() => setBundle(false)}
            >
              Starter Kit — $15.99
              <span>Includes 4 mazes</span>
            </button>
            <button
              className={`${styles.bundleBtn} ${bundle ? styles.bundleActive : ''}`}
              onClick={() => setBundle(true)}
            >
              Bundle — $20.99
              <span>Includes 9 mazes</span>
            </button>
          </div>
        </div>

        {/* Cart Row */}
        <div className={styles.cartRow}>
          <button
            className={styles.addToCart}
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Redirecting...' : `Add to Cart — $${total.toFixed(2)}`}
          </button>
          <div className={styles.quantity}>
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>
        </div>

        <p className={styles.shipping}>
          🚚 Ships in 3-5 business days · Questions? <a href="mailto:officialjoystickjourney@gmail.com">officialjoystickjourney@gmail.com</a>
        </p>
      <p className={styles.disclaimer}>
        ⚠️ Choking hazard — contains small parts. Not suitable for children under 3 years.
      </p>
        {/* Accordion */}
        <div className={styles.accordion}>
          {accordionItems.map((item, i) => (
            <div key={i} className={styles.accordionItem}>
              <button
                className={styles.accordionBtn}
                onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
              >
                {item.title}
                <span>{openAccordion === i ? '−' : '+'}</span>
              </button>
              {openAccordion === i && (
                <p className={styles.accordionContent}>{item.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
