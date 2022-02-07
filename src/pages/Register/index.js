import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css'

const Register = () => {
    const navigate = useNavigate()
    const [register, setRegister] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState([]) 

    const handleInput = e => {
        setRegister({...register, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        fetch('https://api-forumpamekasancode.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(register)
        }).then(r => r.json())
        .then(function(response) {
            const message = response.message
            const data = response.data
            const token = response.token

            if(message === 'Registration Success') {
                localStorage.setItem('profile', JSON.stringify(data))
                localStorage.setItem('auth_token', token)
                navigate('/')
            } else {
                setErrors(data)
            }
        })
    }

  return (
      <>
        <div className='auth'>
            <h1>Register</h1>
            <div className='form_auth'>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <input type='text' name='name' onChange={handleInput} placeholder='Name' />
                        { errors.name ? <p className='error'>{errors.name}</p>: ''}
                    </div>
                    <div className='input'>
                        <input type='email' name='email' onChange={handleInput} placeholder='Email' />
                        { errors.email ? <p className='error'>{errors.email}</p>: ''}
                    </div>
                    <div className='input'>
                        <input type='password' name='password' onChange={handleInput} placeholder='Password' />
                        { errors.password ? <p className='error'>{errors.password}</p>: ''}
                    </div>
                    <button>Register</button>
                </form>
            </div>
            <div className='form_footer'>
                <p>Sudah Mempunyai Akun?<Link to='/login'>Masuk Disini</Link></p>
            </div>
        </div>
      </>
  );
};

export default Register;