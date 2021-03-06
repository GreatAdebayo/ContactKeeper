//Global state and functions
import React, { useReducer } from 'react'
import AuthContext from '../auth/authContext'
import authReducers from './authReducers'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../auth/authActions'

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('ctoken'),
        isAutheticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducers, initialState)


    //Load Users
    const loadUser = async () => {
        if(localStorage.ctoken){
        setAuthToken(localStorage.ctoken)
        }
        try {
            const res = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }


    //Register Users
    const registerUser = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
           loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }

    }
 
    //Login Users
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
           loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }

    }



    //Logout Users

    const logout = () =>{
        dispatch({
            type:LOGOUT
        })
    }

    //Clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAutheticated: state.isAutheticated,
            loading: state.loading,
            error: state.error,
            user: state.user,
            registerUser,
            clearErrors,
            loadUser,
            login,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState
