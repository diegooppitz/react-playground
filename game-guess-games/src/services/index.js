import axios from "axios";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

const urlToken = 'https://id.twitch.tv/oauth2/token';
const urlGames = "https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games/"
const urlCovers = 'https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/covers'

export const postLogin = () => {
  return axios.post(`${urlToken}`, {
    client_id,
    client_secret,
    grant_type: 'client_credentials',
  })
}

export const postGame = () => {
  const token = localStorage.getItem('token');
  const fields = "fields *; where rating > 90;"

  return axios.post(
    urlGames,
    fields, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': client_id,
      },
    }
  );
}

export const postGameCover = (gameId) => {
  const token = localStorage.getItem('token');
  const fields = `fields *; where game = ${gameId};`

  return axios.post(
    urlCovers,
    fields, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': client_id,
      },
    }
  );
}

export const postSearchGame = (value) => {
  const token = localStorage.getItem('token');
  const fields = `fields name, rating; where rating > 88; search "${value}";`

  return axios.post(
    urlGames,
    fields, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-Id': client_id,
      },
    }
  );
}