import React , {createContext , useReducer} from 'react'
import jwtDecode from 'jwt-decode'

import AuthReducer from './authReducer'

export const types = {
LOGIN_SUCCESS : 'LOGIN_SUCCESS' ,
CLEAR_INFO : 'CLEAR_INFO',
LOGOUT : 'LOGOUT',
LOAD_USER : 'LOAD_USER',
SET_INFO : "SET_INFO"
}

export const AuthContext = createContext()

const AuthProvider = (props) => {

    const initalState = {
        isAuthenticated : null ,
        error : null ,
        loading : true ,
        user : null ,
        info : null
      }

     const [state, dispatch] = useReducer(AuthReducer, initalState) 

     const loadUser = () =>{
         if(localStorage.getItem("token")){
            const decoded =  jwtDecode(localStorage.getItem("token"))
            if(decoded.exp * 1000 < Date.now()){
                localStorage.removeItem('token')
            }else{
                dispatch({type:types.LOAD_USER , payload : decoded})
                console.log(decoded)
            }
         }
     }

     const login = (data) => {
          dispatch({type: types.LOGIN_SUCCESS,payload:data})
     }

     const setInfo = (info) =>{
         dispatch({type:types.SET_INFO , payload : info})
     }

     const logout = () => {
         dispatch({type:types.LOGOUT})
      }

     const clearinfo = () => {
         dispatch({type:types.CLEAR_INFO})
     }

return (
    <AuthContext.Provider value={{ info : state.info ,user:state.user , loading : state.loading , error : state.error , isAuthenticated:state.isAuthenticated , login , clearinfo , logout , loadUser , setInfo}}>
    {props.children}
    </AuthContext.Provider>
)
}

export default AuthProvider