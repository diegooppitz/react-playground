// libs
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

// styles
import styles from "@/styles/MainContent.module.css"

// assets
import ImageMusic from "../../public/image-music.jpg";


export default function MainContent({ songsData, togglePlaySong, globalSongId, globalIsRunning }) {
    const [indexRunning, setIndexRunning] = React.useState(null);

    function handleClick(index) {
        if(index === indexRunning) {
            setIndexRunning(null);
            togglePlaySong(false, index)
        }
        else {
            setIndexRunning(index);
            togglePlaySong(true, index)
        }
    }

    useEffect(() => {
        if (globalIsRunning) setIndexRunning(globalSongId);
        else setIndexRunning(null);
    }, [globalIsRunning])

    return (
        <div className={styles.mainContent}>
            <div className={styles.mc__row}>
                <h3 className={styles.mc__rowTitle}>Recommended for today</h3>
                <div className={styles.mc__rowSongs}>
                    {songsData && songsData.map((item, index) => (
                        <div className={styles.mc__square} key={index}>
                            <div className={styles.mc__playOption} onClick={() => handleClick(index)}>
                                {indexRunning === index && <FontAwesomeIcon className={styles.mc__stop} icon={faPause} />}
                                {indexRunning != index && <FontAwesomeIcon className={styles.mc__play} icon={faPlay} />}
                            </div>
                            <Image src={ImageMusic} className={styles.mc__image} alt="Song" width={175} />
                            <h3>{item.name}</h3>
                            <p>{item.artist}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}