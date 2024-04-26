import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '8587718e4c5555e659f6cd1b19d37441',
        language: 'pt-BR',
        include_adult: false,
    },
});