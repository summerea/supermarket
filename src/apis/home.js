import $http from '../utils/apis'
export const getMenu =()=>{
    return $http.get('menus')
}

