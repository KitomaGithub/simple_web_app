"use client";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

export default function Register () { 

    const [showPassword, setShowPassword] = useState(true);
    const [passwordType, setPasswordType] = useState("password");
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("")
    
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");

    const user = useSelector((state: RootState) => state.user)


    useEffect(() => {
        if(user.isSignedIn) {
            window.location.href = "/dashboard/blogs";
        }
    })

    function togglePassword () {
        
        if (showPassword) {
            setShowPassword(false);
            setPasswordType("text");
        } else {
            setShowPassword(true);
            setPasswordType("password");
        }
    }

    async function signUp() {
    
        const {data: users} = await supabase.from("users").select("*");

        console.log(users)

        if(users?.filter(row => row.username == username).length == 1) {
            setError(true); 
            setMessage("Username already exist")
        } else if(password == "" || email == "" || password == "") {
            setError(true); 
            setMessage("No Input Field should be empty")
        } else if(password.length < 6) {
            setError(true); 
            setMessage("Password must have atleat 6 characters")
        } else if(password == passwordConfirm) {
            setMessage("")
            const {error} = await supabase.auth.signUp({
                "email" : email,
                "password" : password,
                "options": {
                    "data": {
                        "username" : username
                    }
                }
            })
            if(error == null) {
                setError(false)
                // console.log(data)
                setMessage("Regsiterd Succesfully")
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000)
            } else {
                setError(true);
                setMessage(error.message);
            }
        } else {
            setError(true)
            setMessage("Password do not match")
        }
    }

    return <div className="h-dvh flex justify-center items-center">
        <div className="border-1 w-[350px] flex flex-col items-center py-10 gap-6 shadow-slate-400 shadow-md">
            <div className="font-bold text-2xl">
                Register
            </div>
            <div className="flex flex-col gap-4 w-[60%]">
                <div className={`min-h-10 flex items-center justify-center text-center ${error ? "text-red-500" : "text-green-500"}`}>
                    {message}
                </div>
                <label className="block">
                    <span className="block uppercase text-sm">email</span>
                    <input type="email" onChange={(inp) => setEmail(inp.currentTarget.value)} id="email" className="border-1 w-full px-2 py-0.5 focus:outline-none focus:ring-0"/>         
                </label>
                <label className="block">
                    <span className="block uppercase text-sm">username</span>
                    <input type="email" onChange={(inp) => setUsername(inp.currentTarget.value)} id="email" className="border-1 w-full px-2 py-0.5 focus:outline-none focus:ring-0"/>         
                </label>
                <label className="block relative">
                    <span className="block uppercase text-sm">password</span>
                    <div className="flex border-1 w-full">
                        <input onChange={(inp) => setPassword(inp.currentTarget.value)} type={passwordType} id="password" className="w-[85%] px-2 py-0.5 focus:outline-none focus:ring-0"/>
                        <button className="cursor-pointer ml-2" onClick={() => togglePassword()}> {showPassword ? <FaEyeSlash/> : <FaEye/>} </button>   
                    </div>
                </label>
                <label className="block relative">
                    <span className="block uppercase text-sm">confirm password</span>
                    <div className="flex border-1 w-full">
                        <input onChange={(inp) => setPasswordConfirm(inp.currentTarget.value)} type={passwordType} id="password" className="w-[85%] px-2 py-0.5 focus:outline-none focus:ring-0"/>
                        <button className="cursor-pointer ml-2" onClick={() => togglePassword()}> {showPassword ? <FaEyeSlash/> : <FaEye/>} </button>   
                    </div>
                </label>
            </div>
            <div className="flex flex-col w-[60%] items-center gap-3">
                <button className="border-1 py-2 w-full font-bold transition-all hover:shadow-md hover:shadow-slate-400 hover:bg-gray-100"
                    onClick={async () => signUp()}
                >
                    REGISTER
                </button>
            </div>
        </div>
    </div>
}