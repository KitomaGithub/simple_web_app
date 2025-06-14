"use client"

import { ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../state/store";
import { signedOut } from "../state/user/userSlice";
import { setUserBlog } from "../state/blogs/blogSlice";
import { supabase } from "@/utils/supabase";

export default function PageLayout({children, title, inDashboard}: Props) {

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user.isSignedIn && inDashboard == true) {
            window.location.href = "/login"
        }
    })

    return <div className={"flex flex-col h-dvh min-h-dvh"}>
        <div className="flex border-b-2 shadow-md shadow-slate-400 h-16 flex-none" >
            <div className="capitalize text-2xl font-bold flex flex-1 items-center px-10">
                {title}
            </div>
            <div className="w-[600px] flex justify-end items-center gap-2">
                <button onClick={() => window.location.href = "/blogs"} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 cursor-pointer ${ !user.isSignedIn ? "hidden" : inDashboard ? "hidden" : ""}`}>
                    Other Blogs
                </button>
                <button onClick={() => window.location.href = `/blogs/${user.username}`} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 cursor-pointer ${inDashboard ? "" : "hidden"}`}>
                    My Blog
                </button>
                <button onClick={() => window.location.href = "/dashboard/blogs"} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 cursor-pointer ${ !user.isSignedIn ? "hidden" : inDashboard ? "hidden" : ""}`}>
                    My Dashboard
                </button>
                <button onClick={() => {supabase.auth.signOut();dispatch(signedOut()); dispatch(setUserBlog([]))}} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 mr-10 cursor-pointer hover:bg-gray-200 ${user.isSignedIn ? "" : "hidden"}`}>
                    Log Out
                </button>
                <button onClick={() => window.location.href = "/login"} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 cursor-pointer hover:bg-gray-200 ${user.isSignedIn ? "hidden" : ""}`}>
                    Log In
                </button>
                <button onClick={() => window.location.href = "/register"} className={`text-xl font-bold px-5 py-2 rounded-xl border-1 mr-10 cursor-pointer hover:bg-gray-200 ${user.isSignedIn ? "hidden" : ""}`}>
                    Register
                </button>
            </div>
        </div>
        <div className="flex-1">
            {children}
        </div>
    </div>
}

interface Props {
    readonly children?: ReactNode,
    title? : string,
    inDashboard?: boolean,
}