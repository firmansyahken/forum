import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

const Login = () => {
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [login, setLogin]  = useState({
        username: '',
        password: ''
    })

    const handleInput = e => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        fetch('https://api-forumpamekasancode.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        }).then(r => r.json())
        .then(function(response) {
            const message = response.message
            const token = response.token
            const data = response.data

            if(message === 'Login Success') {
                localStorage.setItem('profile', JSON.stringify(data))
                localStorage.setItem('auth_token', token)
                navigate('/')
            } else {
                setActive(true)
            }
        })
    }

  return (
      <>
        <div className='auth'>
            <h1>Login</h1>
            <div className='form_auth'>
                {active ? 
                    <div className='alert'>
                        <p>Username / Password Salah!</p>
                    </div>
                : ''}
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <input name='email' onChange={handleInput} type='email' placeholder='Email' />
                    </div>
                    <div className='input'>
                        <input name='password' onChange={handleInput} type='password' placeholder='Password' />
                    </div>
                    <button>Login</button>
                </form>
            </div>
            <div className='form_footer'>
                <p>Tidak Mempunyai Akun?<Link to='/register'>Daftar Disini</Link></p>
            </div>
        </div>
      </>
  );
};

export default Login;
