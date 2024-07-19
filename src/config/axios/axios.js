import axios from 'axios';

const API_BASE = "https://zhhrsa4dth.execute-api.us-east-1.amazonaws.com/Stage";

console.log({env: process.env})

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 30000
})

export default instance;