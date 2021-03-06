import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAutheticated, loading } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => !isAutheticated && !loading ? (
            <Redirect to='/login' />) :
            (<Component {...props}/>)
        } />

    )
}

export default PrivateRoute
