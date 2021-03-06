import React, { useState, useContext, useEffect} from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

    const { setAlert } = useContext(AlertContext)
    const { login, error, clearErrors, isAutheticated} = useContext(AuthContext)
    useEffect(()=>{
        if(isAutheticated){
         props.history.push('/')
        }
         if(error === 'Invalid credentials'){
            setAlert(error, 'danger')
            clearErrors()
         }
         // eslint-disable-next-line
        }, [error, isAutheticated, props.history])

    
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const {email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
   e.preventDefault();
   login(user)
  }
    return (
        <div className='form-container'>
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              id='email'
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </form>
      </div>
    )
}

export default Login
