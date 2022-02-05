import React, { useEffect, useState } from 'react';
import './index.css'

const Filter = (props) => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    fetch("https://api-forumpamekasancode.herokuapp.com/api/categories")
        .then((r) => r.json())
        .then(function (response) {
            const data = response.data;
            setCategories(data);
        });
  }, []);

  return (
      <>
        <select className='filter' onChange={(e) => props.onChangeFilter(e.target.value)}>
          <option value='0'>All Topic</option>
          { categories.map(cat => {
              return <option key={cat.id} value={cat.id}>{cat.name}</option>
          })  }
        </select>
      </>
  );
};

export default Filter;
