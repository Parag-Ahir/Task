import Axios from 'axios';

export const getCountryList = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
    };
    return Axios.get('https://restcountries.eu/rest/v2/all').then(response => ({ response }), error => ({ error }));
}