// import axios from 'axios'
import $http from '../utils/apis'

export const login =(params)=>{
    return $http.post('login',params)
}