import React from 'react';
import './index.css'
import { Link, useNavigate } from 'react-router-dom';
import { CommentIcon } from '../../assets';

const CardAccount = (props) => {
    const token = localStorage.getItem('auth_token')
    const navigate = useNavigate()

    const handleDelete = () => {
        if(window.confirm('Are you sure ?')) {
            fetch(`https://api-forumpamekasancode.herokuapp.com/api/post/${props.id}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token
                }
            }).then(r => r.json())
            .then(function(response) {
                const message =  response.message
                if(message === 'Success Delete') {
                    alert('Data Has Been Delete')
                }
            })
        }
    }
  return (
      <>
        <div className='card'>
            <div className='card_header'>
                <div className='card_date'>
                    <p>{props.date}</p>
                </div>
                <div className='card_action'>
                    <button><i className='fa fa-pencil' onClick={() => navigate('/edit/'+props.id)}></i></button>
                    <button><i className='fa fa-trash' onClick={handleDelete}></i></button>
                </div>
            </div>
            <div className='card_main'>
                <Link to={`/category/${props.category_id}`}>{props.category}</Link>
                <h2>{props.title}</h2>
                <p>{props.content}</p>
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

export default CardAccount;
