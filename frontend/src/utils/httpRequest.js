import axios from 'axios';

function myAxios(axiosConfig) {
  const service = axios.create({
    // baseURL: "http://localhost:3010",  // 1. 直接请求服务器
    timeout: 10000, // 设置统一的超时时长
  });
  // 请求拦截
  service.interceptors.request.use(
    config => {
      return config;
    }, 
    error => {
      return Promise.reject(error);
    }
  );

  // 响应拦截
  service.interceptors.response.use(
    response => {
      if(response.data) {
        return {
          code: response.status,
          data: response.data,
          message: response.statusText
        };
      } else {
        console.log("util: ", response);
        return Promise.reject({
          code: "10086",
          message: "出现了一些问题"
        });  
      }
    },
    error => {
      return Promise.reject(error);
    }
  );
  return service(axiosConfig)
}

export default myAxios;