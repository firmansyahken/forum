import React from 'react';
import './index.css'

function Answer(props) {
  return (
      <>
        <div className='answer'>
            <div className='answer_image'>
                <img src={props.photo} alt='profile' />
            </div>
            <div className='answer_content'>
                <div className='answer_content_header'>
                  <p className='answer_name'>{props.name}</p>
                  <p className='answer_date'>{props.date}</p>
                </div>
                <p className='answer_message'>{props.message}</p>
            </div>
        </div>
      </>
  );
}

export default Answer;
