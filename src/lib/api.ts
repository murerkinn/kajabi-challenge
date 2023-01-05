import axios from 'axios'

export const API = axios.create({
  baseURL: '/api',
})

export const ReqResAPI = axios.create({
  baseURL: 'https://reqres.in/api',
})
