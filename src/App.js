import './App.css';

import RightSide from "./components/right-side/right-side";
import {Routes, Route, Link} from "react-router-dom";
import Massages from "./components/messages/massages";
import Profile from "./components/profile/profile";
import {useState} from "react";
import {stockData} from "./database";

function App() {
    const [newMessageArr, setNewMessageArr] = useState('')
    const [activeUserId, setActiveUserId] = useState('')
    const [userParams, setUserParams] = useState([])
    function getNewMessage(array) {
        setNewMessageArr(array)
    }
    function getUsersParams(params) {
        setUserParams(params)
    }
    function getActiveUserID(id) {
        setActiveUserId(id)
    }


    return (
        <div>
            <div className="wrapper">
                <RightSide data={newMessageArr} actUserID={activeUserId} params = {userParams}/>
                <Routes>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='user/:username/:id' element={<Massages data={getNewMessage}
                                                                        getId={getActiveUserID}
                                                                        getParams = {getUsersParams}
                    />}
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
