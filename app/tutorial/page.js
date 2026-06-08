import Navbar from '../components/Navbar' //added tutorial page
import styles from './tutorial.module.css'

export default function TutorialPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.hero}>
        <div className={styles.eyebrow}>Watch & Learn</div>
        <h1 className={styles.title}>See it in <em>action.</em></h1>
        <p className={styles.sub}>
          Here is our tutorial on how to use the Joystick Journey! Whether you're just unboxing for the first time or looking to master the trickier maze boards, this video walks you through everything you need to know — from setting up the base unit, snapping in your first maze, to guiding the marble like a pro.
        </p>
      </div>

      <div className={styles.videoWrapper}>
        <iframe
          src="https://www.youtube.com/embed/mnO6yaKIHuQ"
          title="Joystick Journey Tutorial"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <div className={styles.tips}>
        <div className={styles.tip}>
          <div className={styles.tipNum}>01</div>
          <div>
            <h3>Unbox & Set Up</h3>
            <p>Place the base unit on a flat surface, insert the joystick into the mount, and snap your first maze board into place. You'll feel it click — that means it's locked in.</p>
          </div>
        </div>
        <div className={styles.tip}>
          <div className={styles.tipNum}>02</div>
          <div>
            <h3>Control the Maze</h3>
            <p>Use the joystick to tilt the maze in any direction. Small, smooth movements work best — slow and steady wins the race, especially on the harder boards.</p>
          </div>
        </div>
        <div className={styles.tip}>
          <div className={styles.tipNum}>03</div>
          <div>
            <h3>Swap & Repeat</h3>
            <p>Finished a maze? Pull the board out from the side slot and snap in a new one in seconds. Each maze has its own unique challenge — collect them all!</p>
          </div>
        </div>
        <div className={styles.tip}>
          <div className={styles.tipNum}>04</div>
          <div>
            <h3>Challenge a Friend</h3>
            <p>Take turns and time each other. Who can finish the Expert maze the fastest? Joystick Journey is even more fun when you make it competitive.</p>
          </div>
        </div>
      </div>

      <div className={styles.cta}>
        <p>Ready to start your journey?</p>
        <a href="/shop" className={styles.ctaBtn}>Shop Now</a>
      </div>
    </div>
  )
}