import './message.scss'

function Message(data) {
    const user = data;

    return (
        <div>
            {
                (user.data.me) ?
                    <div className="my__massage-block">
                        <span className="my__message">{user.data.me}</span>
                        <p className='message__date'>{user.data.date}</p>
                    </div>
                    :
                    <div className="chuck__massage-block">
                        <div className="user__img">
                            <img src={user.photo} alt="" className="user__img-link"/>
                        </div>
                        <div className="chuck-content">
                            <p className="chuck__massage">{user.data.chuck}</p>
                            <p className='message__date'>{user.data.date}</p>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Message;