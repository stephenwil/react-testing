import config from '../../../config.json';
import {fetchSuccess} from '../reducers/cake';

// actions to be raised (and then handled) once data is fetched
export function fetchData(url) {
    return (dispatch) => {
        fetch('http://' + config.data.host + ':' + config.data.port + config.data.uri, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {if (response.ok) return response.json()})
        .then((items) => dispatch(fetchSuccess(items)))
        .catch((error) => console.error('unhandled error: ', error));
    }
}