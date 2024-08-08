import React from "react";
import Link from "next/link";
import styles from "./welcome.module.css";

const WelcomePage = () => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 id="welc-title" className={styles.welcomeTitle}>Welcome to Calendar App</h1>
      <p id="welc-desc" className={styles.welcomeDescription}>
        Manage your routine effectively
      </p>
      <Link id="welc-btn" className={styles.welcomeButton} href="/calendar" passHref>
        Access Calendar
      </Link>
    </div>
  );
};

export default WelcomePage;
