import './users.css'
import {NavLink} from "react-router-dom";

function User(data) {
    const {user, messages} = data.data
    const message = (Object.values(messages[messages.length - 1]).toString()).split(',')[0]
    const date = ((Object.values(messages[messages.length - 1]).toString()).split(',')[1]).split(' ')[0]

    return (
        <NavLink to={`/user/${user.firstName}${user.lastName}/${data.data.id}`}
        className='user__link'>
        <div className='users__body'>
                <div className='user__item'>
                    <div className="user__photo">
                        <img className='user__photo-link' src={user.photo} alt="user photo"/>
                    </div>
                    <div className="user__info">
                        <p className="user__name">{user.firstName} {user.lastName} </p>
                        <p className="user__massage">{
                            (message.length  < 50)?message : message.substring(0 ,50) + '...'
                        }</p>
                    </div>
                    <div className="message__info-block">
                        <p>{date}</p>
                        <span className='count__unread' > {data.data.unread}</span>
                    </div>

                </div>

        </div>
        </NavLink>
    );

}

export default User;