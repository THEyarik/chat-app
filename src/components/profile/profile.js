import './profile.scss';



function Profile(data) {
   const account = data.data.userAccountData
    console.log(account)
    return (
        <div>
                <div className="profile__container">
                    <img className='profile__icon' src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt=""/>
                    <div className="account__info">
                        <p>{account.given_name} {account.family_name}</p>
                    </div>
                </div>

        </div>
    );

}

export default Profile;