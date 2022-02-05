import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

function List(props) {
  return (
    <>
        <div className='list'>
            <img src={props.photo} alt='profile' /> 
            <Link to={`/profile/${props.name}`}>{props.name}</Link>
        </div>
    </>
  );
}

export default List;
