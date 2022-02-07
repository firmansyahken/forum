import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Answer } from '../../components';
import './index.css';

function Detail() {
    const params = useParams()
    const id = params.id
    const profile = JSON.parse(localStorage.getItem('profile'))
    const token = localStorage.getItem('auth_token')

    const [post, setPost] = useState([])
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState('')

        
    useEffect(() => {
        fetch('https://api-forumpamekasancode.herokuapp.com/api/post/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then(r => r.json())
            .then(function (response) {
                const dataPost = response.data.post[0]
                const dataAnswer = response.data.answer

                setPost(dataPost)
                setAnswers(dataAnswer)
        })
    }, [answers])

    const handleSubmit = e => {
        e.preventDefault()
        const dataAnswer = {
            post_id: id,
            user_id: profile.id,
            message: answer
        }

        fetch('https://api-forumpamekasancode.herokuapp.com/api/answer/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(dataAnswer)
        }).then(r => r.json())
            .then(function (response) {
                const message = response.message
                if (message === 'Answer Success') {
                    e.target.reset()
                }
            })
    }

    return (
        <>
            <div className='container'>
                <div className='post'>
                    <div className='post_header'>
                        <div className='post_profile'>
                            <img src={post.photo} alt='profile' />
                            <p>{post.name}</p>
                        </div>
                        <div className='post_date'>
                            <p>{post.date}</p>
                        </div>
                    </div>

                    <div className='post_main'>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='input_answer'>
                            <textarea onChange={(e) => setAnswer(e.target.value)} placeholder='Tulis Jawaban' ></textarea>
                            <button><i className='fa fa-pencil'></i></button>
                        </div>
                    </form>
                </div>

                <div className='answers'>
                    <h2>Semua Jawaban</h2>
                    <div className='answers_main'>
                        {answers.map(answer => {
                            return <Answer key={answer.id}
                                name={answer.name}
                                message={answer.message}
                                photo={answer.photo}
                                date={answer.date} />
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Detail;
