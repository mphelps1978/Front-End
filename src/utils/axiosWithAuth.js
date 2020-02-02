import axios from 'axios'

export const axiosWithAuth = () => {
  return axios.create({
      baseURL: '',
      headers: {
        authorization: localStorage.getItem('token')
      }
  });
}