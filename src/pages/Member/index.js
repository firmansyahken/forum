import React, { useEffect, useState } from 'react';
import { List } from '../../components';
import './index.css';

function Member() {
    const [members, setMembers] = useState([])
    const [keyword, setKeyword] = useState('')
    useEffect(() => {
        fetch(`https://api-forumpamekasancode.herokuapp.com/api/member/search/${keyword}`).then(r => r.json())
        .then(function(response) {
            const data = response.data
            setMembers(data)
        })
    }, [keyword])

    useEffect(() => {
        fetch('https://api-forumpamekasancode.herokuapp.com/api/member').then(r => r.json())
        .then(function(response) {
            const data = response.data
            setMembers(data)
        })
    }, [])

    const handleInput = e => {
        if(e.keyCode === 13) {
            setKeyword(e.target.value)
        }
    }
  return (
        <>
            <div className='container'>
                <input placeholder='Search Name' onKeyUp={(e) => handleInput(e)}  className='member_search' />
                <div className='list_group'>
                   { members.map(member => {
                    return <List key={member.id}
                    photo={member.photo}
                    name={member.name}/> 
                   }) }
                </div>
            </div>
        </>
  );
}

export default Member;
