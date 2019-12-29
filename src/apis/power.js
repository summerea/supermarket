import $http from '../utils/apis'

export const getPowerList = ()=>{
    return $http.get('rights/list')
}
export const getRolesList = ()=>{
    return $http.get('roles')
}