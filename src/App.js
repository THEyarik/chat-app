import './App.scss';

import RightSide from "./components/right-side/right-side";
import {Routes, Route, Link} from "react-router-dom";
import Messages from "./components/messages/messages";
import Profile from "./components/profile/profile";
import {useState} from "react";
import {stockData} from "./database";
import ChoseDialogMessage from "./components/messages/choseDialogMessage";
import Login from "./components/login/login";

function App() {

    const [newMessageArr, setNewMessageArr] = useState('');
    const [activeUserId, setActiveUserId] = useState('');
    const [userParams, setUserParams] = useState([]);
    const screenWidth = window.screen.width;
    const googleAccount = JSON.parse(localStorage.getItem('my-account'));
    const [isLoginData ,setIsLoginData] = useState(googleAccount)
    function getNewMessage(array) {
        setNewMessageArr(array)
    }

    function getUsersParams(params) {
        setUserParams(params)
    }

    function getActiveUserID(id) {
        setActiveUserId(id)
    }
    function getIsLoginData(data) {
        setIsLoginData(data)
    }

    return (
        <div>
            {
                (screenWidth >= 800) ?
                    <div className="wrapper">

                        {
                            (isLoginData)?  <RightSide data={newMessageArr} actUserID={activeUserId} userAccountData={isLoginData}
                                       params={userParams}/> : <Login getIsLog={getIsLoginData}/>
                        }
                            <Routes>
                                <Route path='/' element={<ChoseDialogMessage/>}/>
                                <Route path='user/:username/:id' element={<Messages data={getNewMessage}
                                                                                    getId={getActiveUserID}
                                                                                    getParams={getUsersParams}
                                />}
                                />
                            </Routes>


                    </div>
                    :
                    <div className="wrapper">
                        <Routes>
                            <Route path='/' element={<RightSide data={newMessageArr} actUserID={activeUserId}
                                                                params={userParams}   getId={getActiveUserID}/>}/>
                            <Route path='user/:username/:id' element={<Messages data={getNewMessage}
                                                                                getId={getActiveUserID}
                                                                                getParams={getUsersParams}
                                                                                actUserID={activeUserId}
                            />}
                            />
                        </Routes>
                    </div>
            }
        </div>
    );
}

export default App;
