import { Inter } from '@next/font/google'
import React, { useEffect, useState } from "react";
import styles from '@/styles/Home.module.css'
import PlayerBar from '@/components/PlayerBar';
import SideBar from '@/components/SideBar';
import MainContent from '@/components/MainContent';
import { getSongs } from "@/services"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [songsData, setSongsData] = React.useState(null);
  const [songId, setSongId] = React.useState(null);
  const [isRunning, setIsRunning] = React.useState(null);

  function fetchData() {
    getSongs().then(({ data }) => {
      setSongsData(data);
    })
  }

  function togglePlaySong(isRunning, id) {
    console.log("aqui", isRunning)
    setIsRunning(isRunning);
    setSongId(id);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className={styles.spotifyHome}>
      <SideBar />
      <MainContent songsData={songsData} globalIsRunning={isRunning} globalSongId={songId} togglePlaySong={togglePlaySong} />
      <PlayerBar globalIsRunning={isRunning} globalSongId={songId} globalToggleSong={togglePlaySong} />
    </div>
  )
}
