//Global state and functions
import React, {useReducer} from 'react'
import AuthContext from '../auth/authContext'
import authReducers from './authReducers'
import axios from 'axios'

import {REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS} from '../auth/authActions'

const AuthState = (props) => {
    const initialState = {
    token:localStorage.getItem('ctoken'),
    isAutheticated:null,
    loading: true,
    error: null,
    user:null
}

const [state, dispatch] = useReducer(authReducers, initialState)


//Load Users



//Register Users
 const registerUser  = async formData =>{
     const config = {
         headers: {
             'Content-Type': 'application/json'
         }
     }
     try {
       const res = await axios.post('/api/users', formData, config); 
       dispatch({
           type:REGISTER_SUCCESS,
           payload:res.data})

     } catch (err) {
         dispatch({
             type:REGISTER_FAIL,
             payload:err.response.data.msg
         })
     }
   
 }

//Login Users



//Logout Users



//Clear errors
const clearErrors = () =>{
 dispatch({
     type:CLEAR_ERRORS
 })
}
return(
    <AuthContext.Provider value={{
    token:state.token,
    isAutheticated:state.isAutheticated,
    loading: state.loading,
    error: state.error,
    user: state.user,
    registerUser,
    clearErrors
    }}>
     {props.children}
    </AuthContext.Provider>
)
    
}

export default AuthState
