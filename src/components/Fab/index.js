import React from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

const Fab = () => {
    const navigate = useNavigate()
    return (
        <>
            <button className='float_button' onClick={() => navigate('/add')} >
                <i className='fa fa-pencil'></i>
            </button>
        </>
    );
};

export default Fab;
