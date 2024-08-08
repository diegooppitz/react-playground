// libs
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

// styles
import styles from '@/styles/SideBar.module.css';

// assets
import Logo from "../../public/logo.png";


export default function SideBar() {
    return (
        <div className={styles.sideBar}>
            <a className={styles.sb__logoLink}>
                <Image src={Logo} className={styles.sb__logo} alt="Logo" width={130} />
            </a>
            <ul className={styles.sb__menuOptions}>
                <li><HomeIcon sx={{ fontSize: 28, color: "#fff" }} /><p>Home</p></li>
                <li><SearchIcon sx={{ fontSize: 28, color: "#fff" }} /><p>Search</p></li>
                <li><LibraryBooksIcon sx={{ fontSize: 25, color: "#fff" }} /><p>Library</p></li>
            </ul>
        </div>
    )
}
