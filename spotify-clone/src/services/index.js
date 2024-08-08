import axios from 'axios';

export const getSongData = (songId) => {
    return axios({
        method: 'GET',
        url: `http://localhost:3000/song/${songId}`,
    })
}

export const getSongs = () => {
    return axios({
        method: 'GET',
        url: `http://localhost:3000/songs`,
    })
}