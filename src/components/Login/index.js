import { useState } from "react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [usernameInput, updateUsernameInput] = useState('')
    const [passwordInput, updatePasswordInput] = useState('')

    const navigate = useNavigate()



    return (
        <GoogleOAuthProvider clientId="541861062148-uorqg9rm0iaeth07k3b78gcs882ckcpq.apps.googleusercontent.com">
            <div className="flex flex-row" >
                <div className="max-sm:hidden flex flex-col justify-center items-center w-1/3 h-screen bg-black">
                    <h1 className="text-white text-5xl font-bold">Board.</h1>
                </div>
                <div className="flex flex-col justify-center items-center w-2/3 h-screen bg-gray-100">
                    <div className="p-1 w-2/3">
                        <h1 className="text-5xl text-black font-semibold">Sign In</h1>
                        <p className="m-2 font-normal">Sign in to your account</p>
                        <div className="flex flex-row items-center flex-wrap">
                            {/* <div className="bg-white p-1 m-3 w-2/5 rounded-md flex flex-row items-center cursor-pointer">
                                <img
                                    className="w-1/5"
                                    src="https://www.techjunkie.com/wp-content/uploads/2020/11/How-to-Change-the-Google-Logo.jpg" alt="google" />
                                <span className="w-2/3 text-gray-500">Sign in with Google</span>
                            </div> */}
                            <GoogleLogin className="w-2/5"
                                onSuccess={credentialResponse => {
                                    Cookies.set('dashboard', credentialResponse.credential,{
                                        expires: 30
                                    })
                                    navigate("/")
                                    // console.log(credentialResponse);
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                            <div className=" bg-white p-1 m-3 sm:w-full md:w-2/5 rounded-md flex flex-row items-center cursor-pointer">
                                <img
                                    className="w-1/5"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8PCSHrC3ZkE8y6elnZuMTNqvnWQtnS1Zdg" alt="google" />
                                <span className="w-2/3 text-gray-500">Sign in with Apple</span>
                            </div>
                        </div>
                        {/* -------------- */}
                        <form className=" bg-white max-sm:w-full md:w-11/12 p-8 m-1 rounded-lg" >
                            <label className="text-black ml-3">Email address</label><br />
                            <input type="text" value={usernameInput} className="bg-gray-100 p-1 m-3 w-11/12 outline-none rounded" onChange={(event) => updateUsernameInput(event.target.value)} />
                            <label className="text-black ml-3">Password</label><br />
                            <input type="password" value={passwordInput} className="bg-gray-100 p-1 m-3 w-11/12 outline-none rounded" onChange={(event) => updatePasswordInput(event.target.value)} />
                            <p className="text-blue-600 ml-3 cursor-pointer">Forgot Password?</p>
                            <button type="button" className="m-5 w-11/12 p-2 rounded bg-black text-white font-semibold" >Sign In</button>
                        </form>

                        <p className="text-gray-500 mt-5 text-center cursor-pointer">Don't have account? <span className="text-blue-600">Register here</span></p>

                    </div>
                </div>
            </div>

        </GoogleOAuthProvider>
    )

}

export default Login