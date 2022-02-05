import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Fab } from '../../components';

const Search = () => {
  const params = useParams()
  const keyword = params.keyword
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(`https://api-forumpamekasancode.herokuapp.com/api/post/search/${keyword}`).then(r => r.json())
    .then(function(response) {
      const data = response.data
      setPosts(data)
    })
  }, [keyword])


  return (
      <>
        <div className='container'>
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
        </div>
      </>
    );
};

export default Search;
