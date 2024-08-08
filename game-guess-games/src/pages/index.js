// libs
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// services
import {
  postGame,
  postLogin,
  postGameCover,
  postSearchGame,
} from "../services";

// styles
import styles from "../styles/Home.module.css";

export default function Home() {
  const [gameIndex, setGameIndex] = useState(0);
  const [gameData, setGameData] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState();

  const [blurValue, setBlurValue] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInfosGame, setShowInfosGame] = useState(false);

  // block duplicated requests
  let loadedToken = false;
  let loaded = false;

  function auth() {
    if (loadedToken) return;
    loadedToken = true;

    postLogin().then((res) => {
      const data = res?.data;
      if (!data) return;

      const access_token = data.access_token ?? "";
      localStorage.setItem("token", access_token);
      fetchGameData();
    });
  }

  function fetchGameData() {
    if (loaded) return;
    loaded = true;
    let gameId = null;

    setShowSuggestions(false);
    setSearchValue(``);
    setBlurValue(0);

    postGame().then(({ data }) => {
      const game = data[gameIndex];
      gameId = game?.id;
      if (!gameId) return;
      fetchGameCover(gameId);

      setGameData(game);
    });
  }

  function fetchGameCover(gameId) {
    postGameCover(gameId).then(({ data }) => {
      let url = data[0].url;
      url = url.replace("t_thumb", "t_720p");
      url = `https:${url}`;

      setImageURL(url);
    });
  }

  function searchGame() {
    postSearchGame(searchValue).then(({ data }) => {
      if (!data || data.length === 0) {
        setShowSuggestions(false);
        showInfoToast();
        return;
      }

      scrollToTheBottom();
      setShowSuggestions(true);
      setSearchResults(data);
    });
  }

  function changeGuessInput(e) {
    setShowSuggestions(false);

    const val = e?.target?.value;
    if (val) setSearchValue(val);
  }

  function checkBlur() {
    if (blurValue === 0) return styles.blurredImg7;
    else if (blurValue === 1) return styles.blurredImg5;
    else if (blurValue === 2) return styles.blurredImg3;
    else return null;
  }

  function showSucessToast() {
    toast.success("You're right!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function showErrorToast() {
    toast.error("Wrong answer!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function showInfoToast() {
    toast.info("No results!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function scrollToTheBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  function scrollToTheTop() {
    window.scrollTo(0, 0);
  }

  
  function clickGame(gameGuess) {
    if(blurValue > 3) {
      setShowSuggestions(false);
      setShowInfosGame(true);

      scrollToTheBottom();
    }
''
    if (gameGuess && gameGuess.id === gameData.id) {
      // setBlurValue(4);
      setShowSuggestions(false);
      setShowInfosGame(true);
      showSucessToast();

      scrollToTheBottom();
      return;
    }

    setBlurValue(blurValue + 1);
    showErrorToast();
  }

  function nextGame() {
    setShowInfosGame(false);
    setGameIndex(gameIndex + 1);
    
    scrollToTheTop();
  }

  useEffect(() => {
    if (gameIndex > 0) fetchGameData();
  }, [gameIndex]);

  useEffect(() => {
    auth();
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <img className={`${styles.gameImg} ${checkBlur()}`} src={imageURL} />
      {showInfosGame && (
        <div className={styles.gameInfos}>
          <p className={styles.gameInfo}>
            Name: <span>{gameData.name}</span>
          </p>
          <p className={styles.gameInfo}>
            Rating: <span>{Math.round(gameData.rating)}</span>
          </p>
          <p className={styles.gameInfo}>
            More infos:
            <a href={gameData.url} className={styles.gameLink}>
              Here
            </a>
          </p>
          <button className={styles.nextGame} onClick={nextGame}>Next game</button>
        </div>
      )}
      {!showInfosGame && (
        <div className={styles.guessOptions}>
          <input
            className={styles.guessInput}
            onChange={changeGuessInput}
            placeholder="Find out name of the game"
          />
          <button onClick={searchGame} className={styles.guessBtn}>
            Search
          </button>

          {showSuggestions && (
            <div className={styles.guessSuggestions}>
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => clickGame(item)}
                  className={styles.suggestionItem}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
