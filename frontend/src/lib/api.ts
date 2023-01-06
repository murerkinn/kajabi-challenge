import axios from 'axios'

export const API = axios.create({
  baseURL: 'http://localhost:4000',
})

export const ReqResAPI = axios.create({
  baseURL: 'https://reqres.in/api',
})
