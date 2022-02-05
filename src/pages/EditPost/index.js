import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css'

const EditPost = () => {
    const params = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('auth_token')
    const id = params.id
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({})
    const [dataPost, setDataPost] = useState({})

    const [errors, setErrors] = useState([])

    useEffect(() => {
        fetch("https://api-forumpamekasancode.herokuapp.com/api/categories")
            .then((r) => r.json())
            .then(function (response) {
                const data = response.data;
                setCategories(data)
            });
    }, []);

    useEffect(() => {
        fetch('https://api-forumpamekasancode.herokuapp.com/api/post/show/'+id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            }
        }).then(r => r.json())
        .then(function(response) {
            const data = response.data.post[0]
            setPost(data)
            setDataPost({
                user_id: data.user_id,
                category_id: data.category_id,
                title: data.title,
                content: data.content
            })
        })
    }, []);


    const handleInput = e => {
        setDataPost({...dataPost, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        fetch(`https://api-forumpamekasancode.herokuapp.com/api/post/${id}/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(dataPost)
        }).then(r => r.json())
        .then(function(response) {
            const message = response.message
            if(message === 'Update Post Success') {
                alert('Update Success')
                navigate('/account')
            } else {
                setErrors(response.data)
            }
        })
        console.log(dataPost)
    }


    return (
        <>
            <div className='container'>
                <div className='form'>
                    <div className='form_header'>
                        <h2>Edit Postingan</h2>
                    </div>
                    <div className='form_post'>
                        <form onSubmit={handleSubmit}>
                            <div className='input'>
                                <label>Kategori Topic</label>
                                <select onChange={handleInput} name="category_id">
                                    <option value={post.category_id}>{post.category}</option>
                                    {categories.map((cat) => {
                                        return (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="input">
                                <label>Judul Topic</label>
                                <input
                                    onChange={handleInput}
                                    type="text"
                                    name="title"
                                    placeholder="Masukkan Judul Topic"
                                    value={dataPost.title}
                                />
                                {errors.title ? <p className='error'>{errors.title}</p> : ''}
                            </div>
                            <div className="input">
                                <label>Konten</label>
                                <textarea value={dataPost.content} onChange={handleInput} name="content" placeholder="Tulis Konten">
                                    {dataPost.content}
                                </textarea>
                                {errors.content ? <p className='error'>{errors.content}</p> : ''}
                            </div>
                            <button>Simpan Perubahan</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditPost;
