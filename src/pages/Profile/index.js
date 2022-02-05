import React, { useEffect, useState } from 'react';
import './index.css'
import { Card } from '../../components'
import { useParams } from 'react-router-dom';

function Profile() {
    const params = useParams()
    const name = params.name

    const [profile, setProfile] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('https://api-forumpamekasancode.herokuapp.com/api/user/'+name).then(r => r.json())
        .then(function(response) {
            const user = response.data.user
            const data = response.data.post
            setProfile(user)
            setPosts(data)
        })
    }, [name])
    console.log(profile)
    return (
      <>
        <div className='container'>
            <div className='profile'>
                <div className='information'>
                    <img src={profile.photo} alt='profile' />
                    <p className='name'>{profile.name}</p>
                    <p className='bio'>{profile.bio}</p>
                </div>
                <div className='main'>
                    { posts.map(post => {
                        return <Card key={post.id}
                        category={post.category}
                        category_id={post.category_id}
                        name={post.name} 
                        title={post.title} 
                        image={post.photo}
                        content={post.content}
                        answered={post.answered}
                        id={post.id}
                        date={post.date}/>
                    })}
                </div>
            </div>
        </div>
      </>
  );
}

export default Profile;
