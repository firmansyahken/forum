import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchInput } from '..';
import { Logo } from '../../assets'
import './index.css'

const Navbar = () => {
  const navigate = useNavigate()
  const auth = localStorage.getItem('auth_token')
  const profile = JSON.parse(localStorage.getItem('profile'))
  const token = localStorage.getItem('auth_token')
  const [active, setActive] = useState(false)

  const handleActive = () => setActive(!active)

  const handleLogout = () => {
    fetch('https://api-forumpamekasancode.herokuapp.com/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(r => r.json())
      .then(function (response) {
        const message = response.message
        if (message === 'Logout Success') {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('profile')
          navigate('/login')
        }
      })
  }

  return (
    <>
      <div className='navbar'>
        <div className='navbar_content'>
          <div className='navbar_left'>
            <div className='navbar_brand'>
              <img src={Logo} alt='logo' />
              <h2>Pamekasancode</h2>
            </div>
            <div className='navbar_link'>
              <Link to='/'>Home</Link>
              <Link to='/member'>Member</Link>
              {auth ? <a onClick={handleLogout}>Logout</a> : <Link to='/login'>Login</Link>}
            </div>
          </div>
          <div className='navbar_right'>
            <SearchInput />
            {auth ? <img onClick={() => navigate('/account')} src={profile.photo} alt='profile' /> : ''}
          </div>
        </div>
      </div>

      <div className='navbar_mobile'>
        <div className='brand'>
          <h1>Forum</h1>
        </div>
        <div className='action'>
          <SearchInput />
          <i className={active ? 'fa fa-times' : 'fa fa-bars'} onClick={handleActive}></i>
        </div>
      </div>

      <div className={active ? "nav_mobile active" : "nav_mobile"}>
        <div className="nav_main">
          <Link to='/'>Home</Link>
          <Link to='/member'>Member</Link>
          { auth ? <Link to='/account'>{profile.name}</Link> : ''}
          {auth ? <a onClick={handleLogout}>Logout</a> : <Link to='/login'>Login</Link>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
