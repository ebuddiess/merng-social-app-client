import {types} from './auth'


// eslint-disable-next-line 
export default(state,action) => {
    switch(action.type){
        case types.LOGIN_SUCCESS : localStorage.setItem("token",action.payload.token) ; return { ...state , user : action.payload , isAuthenticated:true ,error : null , loading : false , info : "LOGIN SUCCESSFULLY" }
        case types.CLEAR_INFO : return { ...state , info : null  }
        case types.SET_INFO : return { ...state , info : action.payload  }
        case types.LOGOUT :localStorage.removeItem("token"); return { ...state , user : null , isAuthenticated : false, info : 'LOGOUT SUCCESSFULLY'  }
        case types.LOAD_USER : return { ...state , user : action.payload , isAuthenticated:true ,error : null , loading : false  }
        default : return state ;
    }
}