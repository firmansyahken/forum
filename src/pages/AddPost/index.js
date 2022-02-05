import React, { useEffect, useState } from "react";
import "./index.css";

const AddPost = () => {
    const profile = JSON.parse(localStorage.getItem('profile'))
    const token = localStorage.getItem('auth_token')
    const [categories, setCategories] = useState([]);
    const [dataPost, setPost] = useState({
        user_id: profile.id,
        category_id: 1,
        title: '',
        content: ''
    })

    const [errors, setErrors] = useState([])
    const [active, setActive] = useState(false)

    useEffect(() => {
        fetch("https://api-forumpamekasancode.herokuapp.com/api/categories")
            .then((r) => r.json())
            .then(function (response) {
                const data = response.data;
                setCategories(data);
            });
    }, []);

    const handleInput = e => {
        setPost({...dataPost, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        fetch('https://api-forumpamekasancode.herokuapp.com/api/post/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(dataPost)
        }).then(r => r.json())
        .then(function(response) {
            const message = response.message
            if(message === 'Post Success') {
                setActive(true)
                e.target.reset()
            } else {
                setErrors(response.data)
            }
        })
    }

    return (
        <>
            <div className="container">
                <div className="form">
                    <div className="form_header">
                        <h2>Tambah Postingan</h2>
                        { active ? <div className="alert">Data berhasil di post</div> : '' }
                    </div>
                    <div className="form_post">
                        <form onSubmit={handleSubmit}>
                            <div className="input">
                                <label>Kategori Topic</label>
                                <select onChange={handleInput} name="category_id">
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
                                />
                                { errors.title ? <p className='error'>{errors.title}</p>: ''}
                            </div>
                            <div className="input">
                                <label>Konten</label>
                                <textarea onChange={handleInput} name="content" placeholder="Tulis Konten"></textarea>
                                { errors.content ? <p className='error'>{errors.content}</p>: ''}
                            </div>
                            <button>Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddPost;
