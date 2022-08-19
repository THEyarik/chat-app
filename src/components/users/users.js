import './user.scss'
import User from "./user";
import {useEffect, useMemo, useState} from "react";
import PUSH from '../../assets/sound/Sound_17211.mp3'
import {Howl} from "howler";


const Users = (data) => {
    const newMessage = data
    const allData = data.allData
    const params = data.data.params
    const activeUserId = data.data.actUserID
    const [allUsersData, setAllUsersData] = useState(allData)
    let currentRecipientProfile = allData.find(user => user.id == params[1])
    const currentProfile = allData.find(user => user.id == activeUserId)

    const sound = new Howl({
        src: PUSH,
        loop: false,
    });
    const readNewMessage = () => {
        if (activeUserId && (currentProfile ? currentProfile.unread > 0 : false)) {
            currentRecipientProfile = allData.find(user => user.id == activeUserId)
            currentRecipientProfile.unread = 0;
            localStorage.setItem("users", JSON.stringify(allData));
        }
    }

    const addUnreadMessage = () => {
        if (params[0] && activeUserId !== params[1]) {
            currentRecipientProfile.unread = +1;
            sound.play();
            sortUsers(allData);
            localStorage.setItem("users", JSON.stringify(allData));
        }
    }

    const sortUsers = () => {
        return allData.sort((a, b) => {
            return b.unread - a.unread
        });
    }
    useMemo(() => readNewMessage(), [activeUserId, allData])
    useMemo(() => addUnreadMessage(), [params])

    function noSearchResult() {
        return <div className='nothing-find'>
            <h3>Нічого не знайдено</h3>
        </div>
    }

    useEffect(() => {
        if (newMessage.data) {
            setTimeout(() => {
                setAllUsersData(allData)
            }, 100)
        }
    }, [allData, params, newMessage])

    return (
        <div>
            <div className="users__containers">
                <h2 className='users__title'>Chats</h2>
                {
                    allUsersData.map(user => <User data={user} key={user.id}/>)
                }
                {
                    allUsersData.length === 0 && noSearchResult()
                }
            </div>
        </div>
    );

}

export default Users;
