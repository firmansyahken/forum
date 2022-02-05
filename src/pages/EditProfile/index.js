import React, { useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const profile = JSON.parse(localStorage.getItem('profile'))
    const token = localStorage.getItem('auth_token')
    const id = profile.id

    const navigate = useNavigate()

    const [dataProfile, setDataProfile] = useState({
        name: profile.name,
        email: profile.email,
        photo: profile.photo,
        bio: profile.bio
    })

    const [errors, setErrors] = useState([])

    const handleInput = e => {
        setDataProfile({...dataProfile, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        fetch('https://api-forumpamekasancode.herokuapp.com/api/profile/'+id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(dataProfile)
        }).then(r => r.json())
        .then(function(response) {
            const message = response.message
            if(message === 'Update Success') {
                const data = response.data
                localStorage.setItem('profile', JSON.stringify(data))
                navigate('/account')
            } else {
                const data = response.data
                setErrors(data)
            }
        }) 
    }
  
  return (
      <>
        <div className='container'>
            <div className='edit_profile'>
                <img src={dataProfile.photo} alt='profile'/>
                <form onSubmit={handleSubmit}>
                    <div className='input'>
                        <p>Nickname</p>
                        <input name='name' onChange={handleInput} type='text' value={dataProfile.name}/>
                        { errors.name ? <p className='error'>{errors.name}</p>: ''}
                    </div>
                    <div className='input'>
                        <p>Photo Profile</p>
                        <input name='photo' onChange={handleInput} type='text' value={dataProfile.photo}/>
                        { errors.photo ? <p className='error'>{errors.photo}</p>: ''}
                    </div>
                    <div className='input'>
                        <p>Bio</p>
                        <textarea name='bio' value={dataProfile.bio} onChange={handleInput}>{dataProfile.bio}</textarea>
                        { errors.bio ? <p className='error'>{errors.bio}</p>: ''}
                    </div>
                    <button>Update Profile</button>
                </form>
            </div>
        </div>
      </>
  );
}

export default EditProfile;
