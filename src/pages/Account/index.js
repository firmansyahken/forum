import React, { useEffect, useState } from 'react';
import './index.css'
import { CardAccount } from '../../components'
import { useNavigate } from 'react-router-dom';

function Account() {
    const navigate = useNavigate()
    const profile = JSON.parse(localStorage.getItem('profile'))
    const token = localStorage.getItem('auth_token')
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const id = profile.id

    useEffect(() => {
        fetch('https://api-forumpamekasancode.herokuapp.com/api/profile/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then(r => r.json())
        .then(function(response) {
            const dataUser = response.data.user
            const dataPost = response.data.post
            setUser(dataUser)
            setPosts(dataPost)
        })
    }, [posts])
  return (
      <>
        <div className='container'>
            <div className='account'>
                <div className='information'>
                    <img src={user.photo} alt='profile' />
                    <p className='name'>{user.name}</p>
                    <p className='bio'>{user.bio}</p>
                    <button onClick={() => navigate('/account/edit')}>Edit Profile<i className='fa fa-pencil'></i></button>
                </div>
                <div className='main'>
                    {posts.map(post => {
                        return <CardAccount key={post.id}
                        category={post.category}
                        category_id={post.category_id}
                        id={post.id}
                        title={post.title} 
                        content={post.content} 
                        answered={post.answered}
                        date={post.date}/>
                    })}
                </div>
            </div>
        </div>
      </>
  );
}

export default Account;
