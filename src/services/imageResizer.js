import axios from 'axios'

const baseURL = 'https://image-resizer-microservice.herokuapp.com'

const resize = img => {
  return axios
    .post(`${baseURL}/resize`, {
      img,
      width: 200
    })
    .then(response => response.data.base64)
}

export default {resize}