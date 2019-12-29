import $http from '../utils/apis'

export const getUsersList = (params)=>{
    return $http.get('users',params)
}
export const changeStatus = (id,status)=>{
    return $http.get(`users/${id}/state/${status}`)
}
export const addUsers = (params)=>{
    return $http.post('users',params)
}
export const addEdit= (params)=>{
    return $http.get('users/'+params)
}
export const sureEdit= (id,params)=>{
    return $http.put('users/'+id,params)
}
export const deleteUsers= (id)=>{
    return $http.delete('users/'+id)
}