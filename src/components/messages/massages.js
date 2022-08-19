import './massages.css'
import {useParams} from "react-router-dom";
import Message from "./message";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment";

function Massages(data) {
    const getNewMessage = data
    const getUsersParams = data.getParams
    const getId = data.getId
    const {username, id} = useParams();
    const [currentId, setCurrentId] = useState(id)
    const userProfile = JSON.parse(localStorage.getItem('users')).find(user => user.id == id);
    const allData = JSON.parse(localStorage.getItem('users'));
    const [messageInput, setMessageInput] = useState('');
    const [chuckMessage, setChuckMessage] = useState(getChuckMessage);
    const [messageArray, setMessageArray] = useState(allData.find(user => user.id == id).messages);


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
                    date: getCurrentDate()
                },
            )
            localStorage.setItem("users", JSON.stringify(allData))
            setTimeout(() => {
                allData.find(user => user.id == id).messages.push(
                    {
                        chuck: chuckMessage,
                        date: getCurrentDate()
                    },
                )
                localStorage.setItem("users", JSON.stringify(allData))
                getChuckMessage()
                setTimeout(() => {
                    getUsersParams([true, id])

                    setTimeout(() => {
                        getUsersParams([false, currentId])
                    }, 200)
                }, 300)
                setMessageInput('')
            }, 10000)
        }
        setMessageInput('')
        return setMessageArray(allData.find(user => user.id == id).messages)
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
        messagesEndRef.current?.scrollIntoView({block: "nearest", behavior: "smooth"});
    };

    useEffect(() => {
        setCurrentId(id)
        getId(id)
        scrollToBottom()
        getNewMessage.data(allData.find(user => user.id == id).messages)
    }, [id, chuckMessage, messageArray])

    return (
        <div>
            <div className="massage__container">
                <header className="massage__header">
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
                < /div>
                <div className="massage__sending">
                    <input
                        value={messageInput}
                        onKeyPress={handleKeyPress}
                        onChange={handleInputMessageChange}
                        placeholder='Type your massage'
                        type="text"
                        className="massage__input"/>
                    <img className='message__send-icon' onClick={sendMessage}
                         src="https://cdn-icons.flaticon.com/png/512/3106/premium/3106794.png?token=exp=1660724628~hmac=fb377451ff71111feb7785ff50739910"
                         alt="send-icon"/>

                </div>

            </div>
        </div>
    );

}

export default Massages;