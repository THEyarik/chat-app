import './profile.css'
import {Link} from "react-router-dom";

function Profile() {

    return (
        <div>
            <Link to='/profile'>
                <div className="profile__container">
                    <img className='profile__icon' src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt=""/>
                </div>

            </Link>


        </div>
    );

}

export default Profile;