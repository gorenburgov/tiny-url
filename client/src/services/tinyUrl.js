import axios from 'axios';
export const getSourceUrl = (tinyUrl) => {
    return axios.post('/source', { tinyUrl });
};

export const getTinyUrl = (sourceUrl) => {
    return axios.post('/tiny', { sourceUrl });
};
