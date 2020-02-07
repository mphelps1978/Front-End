import axios from 'axios'

export const axiosWithAuth = () => {
  return axios.create({
      baseURL: 'https://choretracker01.herokuapp.com',
      headers: {
        authorization: localStorage.getItem('token')
      }
  });
}