import './user.scss'
import {Link} from "react-router-dom";

function User(data) {
    const {user, messages} = data.data
    const screenWidth = window.screen.width;

    const getId = data.getId

    const getMessage = () =>{
        let str = Object.values(messages[messages.length - 1]).toString();
        let indexDate = str.indexOf('date:');
        let message = str.substring(0,indexDate-1);
        return message
    }

    const getDate = () => {
        let str = Object.values(messages[messages.length - 1]).toString();
        let indexDate = str.indexOf('date:');
        let fullDate = str.substring(indexDate + 5, str.length);
        let date = (fullDate.split(' '))[1];
        return date;
    }

    const replaceMessage = () => {
        if (screenWidth >= 800) {
            return (getMessage().length < 50) ? getMessage() : getMessage().substring(0, 47) + '...'
        }
        if (screenWidth < 800) {
            return (getMessage().length < 25) ? getMessage() : getMessage().substring(0, 22) + '...'
        }
    }
    const handleLinkClick = () => {
        if (screenWidth < 800) getId(data.data.id)
    };

    return (
        <Link onClick={handleLinkClick} to={`/user/${user.firstName}${user.lastName}/${data.data.id}`}
              className='user__link'>
            <div className='users__body'>
                <div className='user__item'>
                    <div className="user__photo">
                        <img className='user__photo-link' src={user.photo} alt="user photo"/>
                    </div>
                    <div className="user__info">
                        <p className="user__name">{user.firstName} {user.lastName} </p>
                        <p className="user__massage">{
                            replaceMessage()
                        }</p>
                    </div>
                    <div className="message__info-block">
                        <p>{getDate()}</p>
                        <span className='count__unread'> {data.data.unread}</span>
                    </div>

                </div>

            </div>
        </Link>
    );

}

export default User;