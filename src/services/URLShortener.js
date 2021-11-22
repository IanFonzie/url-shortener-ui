import axios from 'axios'

const baseURL = 'https://shortenl.ink'

const create = longURL => {
  return axios
    .post(`${baseURL}/urls`, {url: longURL})
    .then(response => response.data)
    .catch(err => {
      const status = err.response && err.response.status;
      switch(status) {
        case 400:
          return {type: 'invalid'}
        case 500:
          return {type: 'server_error'}
        default:
          return {type: 'network'}
      }
    })
}

export default { create }