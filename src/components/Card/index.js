import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';
import { CommentIcon } from '../../assets';

const Card = (props) => {
  return (
      <>
        <div className='card'>
            <div className='card_header'>
                <div className='card_profile'>
                    <img src={props.image} alt='profile' />
                </div>
                <div className='card_info'>
                    <Link to={`/profile/${props.name}`}>{props.name}</Link>
                    <p>{props.date}</p>
                </div>
            </div>
            <div className='card_main'>
                <Link to={`/category/${props.category_id}`}>{props.category}</Link>
                <h2>{props.title}</h2>
                <p>{props.content.length > 150 ? props.content.substring(0, 150)+"..." : props.content}</p>
            </div>
            <div className='card_footer'>
                <div className='card_comment'>
                    <img src={CommentIcon} alt='icon'/>
                    <p>{props.answered}</p>
                </div>
                <div className='card_link'>
                    <Link to={`/detail/${props.id}`}>Lihat Jawaban</Link>
                </div>
            </div>
        </div>
      </>
  );
};

export default Card;
