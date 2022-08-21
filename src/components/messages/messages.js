import './message.scss'
import {useParams, useNavigate} from "react-router-dom";
import Message from "./message";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment";
import searchIcon from '../../assets/icon/send.png';
import backArrow from '../../assets/icon/back.png';

function Messages(data) {
    const getNewMessage = data
    const getUsersParams = data.getParams
    const getId = data.getId
    const actUserId = data.actUserID
    const {username, id} = useParams();
    const [currentId, setCurrentId] = useState(id)
    const userProfile = JSON.parse(localStorage.getItem('users')).find(user => user.id == id);
    const allData = JSON.parse(localStorage.getItem('users'));
    const [messageInput, setMessageInput] = useState('');
    const [chuckMessage, setChuckMessage] = useState(getChuckMessage);
    const [messageArray, setMessageArray] = useState(allData.find(user => user.id == id).messages);
    const screenWidth = window.screen.width;
    const history = useNavigate();

    const returnBackOnPhone = () => {
        history(-1);
    }

    const getCurrentDate = () => {
        return moment().format("MMM/DD/YY hh:mm a")
    }

    const uniqId = () => {
        return Math.round(Math.random() * (10000000000000 - 1) + 1)
    }

    const handleInputMessageChange = (e) => {
        setMessageInput(e.target.value)
    }

    const sendMessage = () => {
        if (messageInput !== '') {
            allData.find(user => user.id == id).messages.push(
                {
                    me: messageInput,
                    date: `date: ${getCurrentDate()}`
                },
            )
            localStorage.setItem("users", JSON.stringify(allData))
            getUsersParams([false, currentId, true])
        }
        sendChuckMessage()
        setMessageInput('')
        return setMessageArray(allData.find(user => user.id == id).messages)
    }

    const sendChuckMessage = () => {
        setTimeout(() => {
            allData.find(user => user.id == id).messages.push(
                {
                    chuck: chuckMessage,
                    date: `date: ${getCurrentDate()}`
                },
            )
            localStorage.setItem("users", JSON.stringify(allData))
            if (screenWidth < 800) getNewMessage.data(allData.find(user => user.id == id).messages)
            getChuckMessage()
            setTimeout(() => {
                getUsersParams([true, id, false])

                setTimeout(() => {
                    getUsersParams([false, currentId, false])
                }, 200)
            }, 300)
            setMessageInput('')

        }, 10000)
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    async function getChuckMessage() {
        const result = await axios.get('https://api.chucknorris.io/jokes/random');
        setChuckMessage(result.data.value)
    }

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        if (screenWidth > 800) messagesEndRef.current?.scrollIntoView({block: "nearest", behavior: "smooth"})

    };

    useEffect(() => {
        setCurrentId(id)
        screenWidth > 800 ? getId(id) : getId(actUserId)
        scrollToBottom()
        if (screenWidth > 800) getNewMessage.data(allData.find(user => user.id == id).messages)
    }, [id, chuckMessage, messageArray])

    return (
        <div>
            <div className="massage__container">
                <header className="massage__header">
                    <img className='header__back-arrow'
                         src={backArrow} alt="back arrow"
                         onClick={() => returnBackOnPhone()}

                    />
                    <div className="user__photo">
                        <img src={userProfile.user.photo} alt="" className="user__photo-link"/>
                    </div>
                    <p className="header__user-name">{userProfile.user.firstName} {userProfile.user.lastName}</p>
                </header>
                <div className="message__content">
                    {
                        userProfile.messages.map(message => <Message data={message} photo={userProfile.user.photo}
                                                                     key={uniqId()}
                        />)
                    }
                    <div ref={messagesEndRef}/>
                </div>
                <div className="massage__sending">
                    <input
                        value={messageInput}
                        onKeyPress={handleKeyPress}
                        onChange={handleInputMessageChange}
                        placeholder='Type your massage'
                        type="text"
                        className="massage__input"/>
                    <img className='message__send-icon' onClick={sendMessage}
                         src={searchIcon}
                         alt="send-icon"/>

                </div>

            </div>
        </div>
    );

}

export default Messages;