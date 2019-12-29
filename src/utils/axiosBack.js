// 分装拦截请求和响应
import $http from "./apis"
// import qs from 'qs';
//拦截请求
$http.interceptors.request.use((req) => {
let token = sessionStorage.getItem("token")
  if (token) {
    // 在请求头添加字段 Authorization (可以是其他的)
    req.headers.Authorization = token
  } 
  return req
})
//拦截响应
$http.interceptors.response.use((res) => {
  return res.data
})

//拦截请求
// 对token处理
// let token = localStorage.getItem('token')
// axios.interceptors.request.use((req)=> {
//   if(req.method==='post'){
//     req.data=qs.stringify({
//       token:token,
//       ...req.data
//     })
//   }else if(req.method==='get'){
//     req.params={
//       token:token,
//       ...req.params
//     }
//   }
//   return req;
//  }, function (error) {
//   return Promise.reject(error);
//  });
 //拦截响应
 //对接受的数据进行处理
// axios.interceptors.response.use(function (res) {
//   return res;
//  }, function (error) {
//   return Promise.reject(error);
//  });

//  class http{
//    static get(url,params){
//      return axios.get(url,params)
//    }
//    static post(url,params){
//     return axios.post(url,params)
//   }
//  }
//  export default http;