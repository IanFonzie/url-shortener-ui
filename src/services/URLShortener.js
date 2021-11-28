import axios from 'axios'
import { INVALID_ERROR, NETWORK_ERROR, SERVER_ERROR } from '../constants';

const baseURL = 'https://shortenl.ink'

const create = url => {
  return axios
    .post(`${baseURL}/urls`, { url })
    .then(response => response.data)
    .catch(err => {
      const status = err.response && err.response.status;
      if (status > 500) {
        throw SERVER_ERROR;
      } else if (status > 400) {
        throw INVALID_ERROR;
      } else {
        throw NETWORK_ERROR;
      }
    })
}

export default { create }