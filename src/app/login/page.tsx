"use client";

import { supabase } from "@/utils/supabase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { signedIn } from "../state/user/userSlice";

export default function Login() {
    
    const dispatch = useDispatch();

    const [error, setError] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [showPassword, setShowPassword] = useState(true);
    const [passwordType, setPasswordType] = useState("password");
    
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if(user.isSignedIn) {
            window.location.href = "/dashboard/blogs";
        }
    })

    const signIn = async () => {

        const {data, error} = await supabase.auth.signInWithPassword({
            "email": email,
            "password": password
        })

        if (error == null){
            setMessage("")
            dispatch(signedIn({
                "email": data.user.email,
                "username" : data.user.user_metadata.username,
                "id": data.user.id
            }));
            window.location.href = "/dashboard/blogs";
        } else {
            setError(true);
            setMessage(error?.message)
        }
    };

    function togglePassword () {
        if (showPassword) {
            setShowPassword(false);
            setPasswordType("text");
        } else {
            setShowPassword(true);
            setPasswordType("password");
        }
    }


return <div className="flex flex-col h-dvh">
        <div className="flex border-b-2 shadow-md shadow-slate-400 h-16 flex-none" >
            <div className="capitalize text-2xl font-bold flex flex-1 items-center px-10">
                
            </div>
            <div className="w-[600px] flex justify-end items-center gap-2">
                <button onClick={() => window.location.href = "/blogs"} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 cursor-pointer mr-10`}>
                    See Blogs
                </button>
            </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
            <div className="border-1 w-[350px] flex flex-col items-center py-10 gap-6 shadow-slate-400 shadow-md">
                <div className="font-bold text-2xl">
                    Simple Blog
                </div>
                <div className="flex flex-col gap-4 w-[60%]">
                    <div className={`h-10 flex ${error ? "text-red-500" : "text-green-500"} items-center justify-center`}>
                        {message}
                    </div>
                    <label className="block">
                        <span className="block uppercase text-sm">email</span>
                        <input id="email" onChange={(inp) => setEmail(inp.currentTarget.value)} className="border-1 w-full px-2 py-0.5 focus:ring-0 focus:outline-0"/>         
                    </label>
                    <label className="block relative">
                        <span className="block uppercase text-sm">password</span>
                        <div className="flex border-1 w-full">
                            <input onChange={(inp) => setPassword(inp.currentTarget.value)} type={passwordType} id="password" className="w-[85%] px-2 py-0.5 focus:outline-none focus:ring-0"/>
                            <button className="cursor-pointer ml-2" onClick={() => togglePassword()}> {showPassword ? <FaEyeSlash/> : <FaEye/>} </button>   
                        </div>
                    </label>
                </div>
                <div className="flex flex-col w-[60%] items-center gap-3">
                    <button onClick={signIn} className="border-1 py-2 w-full cursor-pointer font-bold transition-all hover:shadow-md hover:shadow-slate-400 hover:bg-gray-100">
                        LOGIN 
                    </button>
                    <Link href={"register"} className="underline text-sm text-blue-600">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    </div>
}