import { Axios } from 'axios'
import AxiosClient from './axios'
import Swal from 'sweetalert2'

//interceptor para las request
AxiosClient.interceptors.request.use(
  (config) => {
    const authToken = localStorage.token;
    if(Boolean(authToken)){
      if(!config.url.includes("login") || !config.url.includes("create_user") || !config.url.includes("set_password")){
        console.log("Estas fuera de una de las paginas de login");
        config.headers.Authorization = `Bearer ${authToken}`
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

//interceptor para los response
AxiosClient.interceptors.response.use(
  (response) => {
    console.log("response: ", response)
    if(response.status && response.status >= 200){
      return Promise.resolve(response);
    }
  },
  (error) => {
    let errorMessage = 'Ha ocurrido un error en el servidor';
    console.log({error});
    if(error.response && error.response.data){
      errorMessage = error.response.data.error_message;
    }
    if(errorMessage === "AuthenticationResult not in response"){
      window.location.href = '/complete-login'
    }
    Swal.fire({
      title: "Ha ocurrido un error",
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
    return Promise.reject(error.response);
  }
)

export default {
  doGet(endPoint) {
    return AxiosClient.get(endPoint);
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
  doDelete(endPoint) {
    return AxiosClient.delete(endPoint);
  }
}