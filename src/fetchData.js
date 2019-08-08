import Axios from "axios";
import comon from './stores/comon'

function on_error(err) {
    if (err && err.response)
        comon.setError(err.response.data);
    else
        comon.setError(err.message);
}

async function getData(url) {
    try {
        const data = await Axios.get(url).then(res => res.data);
        return data;
    } catch (err) {
        on_error(err);
    }
}

export default getData