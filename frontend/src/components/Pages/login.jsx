import {React ,useState} from 'react'
import ButtonPrimary from '../UI/Buttons/Button_Primary';
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from '../../config';


function Login() {
     const navigate = useNavigate();
     const [formData, setFormData] = useState({
       password: "",
       email: "",
     });
     const onSubmitHandler = async (e) => {
       e.preventDefault();
       console.log("submitted");
       try {
         const response = await axios.post(
           `${backendUrl}/api/auth/login`,
           formData
         );
         console.log(response)
         if (response.status == 200) {
          console.log('success')
             navigate("/calender");
         } else if (response.data.error) {
           console.log(error);
         }
       } catch (error) {
         console.log(error);
       }
     };

     const formHandler = (e) => {
       console.log(e.target.value);
       const { name, value } = e.target;
       setFormData({
         ...formData,
         [name]: value,
       });
     };
  return (
    <div className="h-[100vh] items-center flex justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-600 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/985/1009/192/internet-entrance-password-login-hd-wallpaper-preview.jpg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-600">
                Please Login First!!!
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to Login In
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  onChange={formHandler}
                  name="email"
                  value={formData.email ?? ""}
                />

                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={formHandler}
                />
                <ButtonPrimary onClick={onSubmitHandler}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Login</span>
                </ButtonPrimary>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Don't have an account?{" "}
                  <Link to="/signup">
                    <span className="text-blue-600 font-semibold">
                      Register Here
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
