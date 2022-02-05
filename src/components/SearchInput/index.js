import { useNavigate } from 'react-router-dom'
import './index.css'

const SearchInput = () => {
    const navigate = useNavigate()
    const handleInput = e => {
        if(e.keyCode === 13) {
            navigate('/search/'+e.target.value)
            e.target.value = ''
        }
    }

    return (
        <input type='search' onKeyUp={(e) => handleInput(e)} className='input_search' placeholder='Cari Topik'/>
    )
}

export default SearchInput;