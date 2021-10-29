import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
    const {isAutheticated, logout, user} = useContext(AuthContext)
    const {clearContact} = useContext(ContactContext)

    const onLogout = () =>{
    logout(); 
    clearContact();    
    }

    const authLink = (
        
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className='fas fa-sign-out-alt'></i><span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon}></i> {title}
            </h1>
            <ul>
            {isAutheticated ? authLink : guestLink}
            </ul>

        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
