// libs
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

// services
import { getSongData } from "@/services";

// helpers
import { roundNumber, songProgress, convertSecondstoTime } from "@/helpers";

// styles
import styles from '@/styles/PlayerBar.module.css';

// assets
import ImageMusic from "../../public/image-music.jpg";

export default function PlayerBar({ globalSongId, globalIsRunning, globalToggleSong }) {
    const audioRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState("00:00");
    const [duration, setDuration] = React.useState("00:00");
    const [volume, setVolume] = React.useState(60);
    const [muteVol, setMuteVolume] = React.useState(false);
    const [songId, setSongId] = React.useState(0);
    const [songData, setSongData] = React.useState(null);

    async function previousSong() {
        // reset
        await audioRef.current.pause();
        setIsRunning(false);
        setProgress(0);

        // change song id
        const id = songId - 1;
        setSongId(id)

        await audioRef.current.load();
        audioRef.current.play();
        setIsRunning(true);
    }

    async function nextSong() {
        // reset
        await audioRef.current.pause();
        setIsRunning(false);
        setProgress(0);

        // change song id
        const id = songId + 1;
        setSongId(id)

        await audioRef.current.load();
        audioRef.current.play();
        setIsRunning(true);
    }

    async function handleClick() {
        if (isRunning) {
            setIsRunning(false);
            await audioRef.current.pause();
            globalToggleSong(false, songId)
        }
        else {
            setIsRunning(true);
            await audioRef.current.play();
            globalToggleSong(true, songId)
        }
    }

    async function fetchData() {
        getSongData(songId).then(({ data }) => {
            setSongData(data);
        })
    }

    function eventUpdate(target) {
        const targetCurrentTime = roundNumber(target?.currentTime);
        const targetDuration = roundNumber(target?.duration);
        const eventPercentage = songProgress(targetCurrentTime, targetDuration);

        setCurrentTime(convertSecondstoTime(targetCurrentTime));
        setDuration(convertSecondstoTime(targetDuration));
        setProgress(eventPercentage);
    }

    function changeVolume(event) {
        const vol = event?.target?.value ?? 0;
        setVolume(vol);
        audioRef.current.volume = vol / 100;
    }

    function changeMuteVol(value) {
        setMuteVolume(value || false);
        audioRef.current.muted = value || false;
    }


    useEffect(() => {
        if (globalIsRunning) {
            setIsRunning(true);
            setSongId(globalSongId);
        } else {
            setIsRunning(false);
        }
    }, [globalIsRunning])

    useEffect(() => {
        audioRef.current.pause();

        if (isRunning) audioRef.current.play();
        if (!isRunning) audioRef.current.pause();
    }, [isRunning])

    useEffect(() => {
        const player = document.querySelector('audio')
        // player.addEventListener("timeupdate", (event) => {console.log(event)})
        player.addEventListener("timeupdate", (event) => {
            const target = event?.target;
            if (target) eventUpdate(target);
        })

        fetchData();
    }, [songId])


    return (
        <div className={styles.playerBar}>
            {songData && (
                <div className={styles.pb__info}>
                    <Image src={ImageMusic} className={styles.pb__imageMusic} alt="Exclude city" width={20} />
                    <div className={styles.pb__infoMusic}>
                        <a href="#">{songData.name}</a>
                        <p>{songData.artist}</p>
                    </div>
                </div>
            )}

            <div className={styles.pb__playerWrapper}>
                <div className={styles.pb__player}>
                    <FontAwesomeIcon className={styles.pb__step} icon={faStepBackward} onClick={() => previousSong()} />
                    <div className={styles.pb__playOption} onClick={() => handleClick()}>
                        {isRunning && <FontAwesomeIcon className={styles.pb__stop} icon={faPause} />}
                        {!isRunning && <FontAwesomeIcon className={styles.pb__play} icon={faPlay} />}
                    </div>
                    <FontAwesomeIcon className={styles.pb__step} icon={faStepForward} onClick={() => nextSong()} />
                    <audio ref={audioRef} src={`http://localhost:3000/song/play/${songId}`}></audio>
                </div>
                <div className={styles.pb__progressBarWrapper}>
                    <p>{currentTime}</p>
                    <Box sx={{ width: '100%', color: "white" }}>
                        <LinearProgress variant="determinate" color="inherit" value={progress} />
                    </Box>
                    <p>{duration}</p>
                </div>
            </div>
            <div className={styles.pb__volumeWrapper}>
                {!muteVol && <VolumeUpIcon onClick={() => changeMuteVol(true)} sx={{ cursor: "pointer", fontSize: 18, color: "#fff" }} />}
                {muteVol && <VolumeOffIcon onClick={() => changeMuteVol(false)} sx={{ cursor: "pointer", fontSize: 18, color: "#fff" }} />}
                <input
                    style={{ backgroundSize: `${volume}% 100%` }}
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={changeVolume}
                />
            </div>
        </div>
    )
}
