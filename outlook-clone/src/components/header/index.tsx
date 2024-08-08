import React from 'react';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <a className={styles.logoSection} href='/'>
        <h1 id="header-title">Outlook Calendar</h1>
      </a>
    </header>
  );
}

export default Header;
