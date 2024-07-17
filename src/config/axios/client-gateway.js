import { Axios } from 'axios'
import AxiosClient from './axios'
import Swal from 'sweetalert2'

//interceptor para las request
AxiosClient.interceptors.request.use(
  (config) => {
    console.log("config from request: ", config)
    const authToken = localStorage.token;
    if(Boolean(authToken)){
      if(!config.url.includes("auth")){
        config.headers.Authorization = `Bearer ${authToken}`
      }
    }
    return config;
  },
  (error) => {
    console.log("error from request: ", error)
    return Promise.reject(error);
  }
)

//interceptor para los response
AxiosClient.interceptors.response.use(
  (response) => {
    console.log("response: ", response)
    if(response.status >= 200 && response.status){

    }
  },
  (error) => {
    console.log("error from response: ", error)
  }
)

export default {
  doGet(endPoint, object) {
    return AxiosClient.get(endPoint, object);
  },
  doPost(endPoint, object) {
    return AxiosClient.post(endPoint, object);
  },
  doPut(endPoint, object) {
    return AxiosClient.put(endPoint, object);
  },
  doPatch(endPoint, object) {
    return AxiosClient.patch(endPoint, object);
  },
  doDelete(endPoint, object) {
    return AxiosClient.delete(endPoint, object);
  }
}