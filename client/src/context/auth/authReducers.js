//Actions and Logics
import {REGISTER_SUCCESS,
REGISTER_FAIL,
USER_LOADED,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT,
CLEAR_ERRORS} from '../auth/authActions'

const authReducers = (state, action) => {
   switch(action.type){
       case REGISTER_SUCCESS:
        localStorage.setItem('ctoken', action.payload.token)
       return {
           ...state, 
           token:action.payload.token,
           isAutheticated:true,
           loading:false
       }
       case REGISTER_FAIL:
           localStorage.removeItem('ctoken')
           return {
               ...state,
               token:null,
               isAutheticated:false,
               loading:false,
               user:null,
               error:action.payload
           }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
       default:
           return state
   }
}

export default authReducers
