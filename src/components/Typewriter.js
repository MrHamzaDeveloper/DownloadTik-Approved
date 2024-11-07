import { useEffect, useState } from "react";
import styles from "./TypewriterText.module.css";


const Typewriter = ({ text }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <h1 className={`${styles.typewriter} flex items-center justify-center mb-6 text-center`}>
      <span className={styles["typewriter-text"]}>
        {text.split("").map((char, index) => (
          <span key={index} className={styles.letter} style={{ animationDelay: `${index * 0.05}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <span
          className={styles.cursor}
          style={{ animationDelay: `${text.length * 0.05}s` }}
        ></span>
      </span>
    </h1>
  );
};

export default Typewriter;
