// components/GdprBanner.js

import styles from "./GdprBanner.module.css";

export default function GdprBanner({ onAccept, onDecline }) {
  return (
    <div className={styles.gdprBanner}>
      <p>We use cookies to enhance your experience. By using our site, you agree to our privacy policy.</p>
      <button onClick={onAccept} className={styles.bannerButton}>Accept</button>
      <button onClick={onDecline} className={styles.bannerButton}>Decline</button>
    </div>
  );
}
