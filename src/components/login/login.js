import './login.scss';
import { GoogleLogin } from '@react-oauth/google'
import jwtDecode from "jwt-decode";
function Login (data) {

const getIsLogin = data.getIsLog

    const onSuccess =(res)=>{
        localStorage.setItem("my-account", JSON.stringify( jwtDecode(res.credential)))
        getIsLogin(jwtDecode(res.credential))
    }
        return (
            <div>
                <div className="login__container">
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                </div>
            </div>
        );

}

export default Login;