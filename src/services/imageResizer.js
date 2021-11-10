import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000/resize'

const resize = b64img => {
  return axios
    .post(baseURL, {
      img: b64img,
      width: 128
    })
    .then(response => response.data.base64)
}

export default {resize}