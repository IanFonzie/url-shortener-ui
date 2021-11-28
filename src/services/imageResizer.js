import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000/resize'

const resize = img => {
  console.log(img)
  return axios
    .post(baseURL, {
      img,
      width: 200
    })
    .then(response => response.data.base64)
}

export default {resize}