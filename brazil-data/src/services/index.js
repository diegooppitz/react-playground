import axios from 'axios';

const url = "http://localhost:3000";

export const getOptionsData = () => {
    return axios({
        method: 'GET',
        url: url,
    })
}

export const getOptionsFilters = (id) => {
    return axios({
        method: 'GET',
        url: `${url}/filters`,
        params: {
            id,
        }
    })
}