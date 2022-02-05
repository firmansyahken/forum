import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Fab, Filter } from '../../components';
import './index.css'

const Home = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [load, setLoad] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(`https://api-forumpamekasancode.herokuapp.com/api/post?page=${page}`).then(r => r.json())
    .then(function(response) {
      const data = response.data
      if(data) {
        setPosts([...posts, ...response.data])
        if(response.data.length < 5) {
          return setLoad(false)
        }
        setLoad(true)
      } 
    })
  }, [page])

  const loadMore = () =>{
    setPage(page + 1)
  }

  const handleCategory = (category) => {
    if(category === 0) {
      navigate('/')
    }
    navigate('/category/'+category)
  }

  return (
      <>
        <div className='container'>
          <div className='header'>
            <h1>Welcome</h1>
            <Filter onChangeFilter={ category => handleCategory(category) }/>
          </div>
          <div className='main'>
            { posts.map((post, index) => {
              return <Card key={index}
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
          <Fab />
          <div className='load_more'>
            { load && <button className='load_button' onClick={loadMore}>Load More</button> }
          </div>
        </div>
      </>
    );
};

export default Home;
