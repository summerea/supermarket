import $http from '../utils/apis'

export const getUsersList = (params)=>{
    return $http.get('users',params)
}
export const changeStatus = (id,status)=>{
    return $http.get(`users/${id}/state/${status}`)
}