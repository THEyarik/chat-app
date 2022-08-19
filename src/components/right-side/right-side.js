import Users from "../users/users";
import Profile from "../profile/profile";
import './rightSide.scss'
import {useEffect, useState} from "react";
import searchIcon from '../../assets/icon/search.png'
import {useParams} from "react-router-dom";

const RightSide = (data) => {
    const allData = JSON.parse(localStorage.getItem('users'));
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [contactRender, setContactRender] = useState(allData);


    const handleInputChange = (e) => {
        setInputSearchValue(e.target.value);
    };
    const searchFilter = () => {
        return allData.filter(contact =>
            contact.user.firstName.toLowerCase().includes(inputSearchValue.toLowerCase())
            || contact.user.lastName.toLowerCase().includes(inputSearchValue.toLowerCase())
        )

    }

    useEffect(() => {
        setContactRender(searchFilter())
    }, [inputSearchValue, data.data])

    return (
        <div className='right-side__container'>
            <div className="header__container">
                <Profile/>
                <div className="input__icons">
                    <img src={searchIcon} alt="search__icon"
                         className="search__icon"/>
                </div>
                <input
                    id='search__user'
                    onChange={handleInputChange}
                    className='users__search'
                    placeholder='Search or start new chat'
                    type="text"
                />

            </div>
            <Users data={data} allData={contactRender}/>

        </div>
    );

}

export default RightSide;


