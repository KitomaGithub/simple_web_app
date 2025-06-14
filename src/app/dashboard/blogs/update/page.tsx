"use client";

import PageLayout from "@/app/component/PageLayout";
import Sidebar from "../../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/app/state/store";
import { supabase } from "@/utils/supabase";
import EditCard from "./editCard";
import { setUserBlog } from "@/app/state/blogs/blogSlice";
// import Tiptap from "@/app/component/TipTap";
// import { useState } from "react";


export default function BlogsUpdate(){

    // const [editorContent, setEditorContent] = useState("");

    // function setContent(data: string) {
    //     setEditorContent(data);
    // }

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const blogs = useSelector((state: RootState) => state.blogs.content);

    const [didItRun, setDidItRun] = useState<boolean>(false);
    useEffect(() => {

        async function getBlogs() {
            const {data: blogs} = await supabase.from("blogs").select("*").eq("author", user.username);
            // const sessopm = await supabase.auth.getSession();
            dispatch(setUserBlog(blogs))
        }
        
        if(!didItRun){
            setDidItRun(true);
            getBlogs();
        }
        

    }, [user.username, didItRun, dispatch])

    return <PageLayout title="My Dashboard" inDashboard={true}>
        <Sidebar>
            <div className="text-2xl font-bold">
                Update a Blog
            </div>
            <div className="flex flex-col gap-3">
                {
                    blogs.map((blog, i) => 
                        <div key={i} className="flex">
                            <div className="flex flex-row gap-10 justify-center items-center px-5">
                                <button className="border-1 text-xl py-5 px-16 rounded-xl cursor-pointer hover:bg-gray-200 hover:shadow-lg"
                                    onClick={() => {
                                        window.location.href += "/" + blog.id;
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                            <EditCard
                                title={blog.title} 
                                content={blog.content}
                                key={i}
                            />
                        </div>
                    )
                }
            </div>
        </Sidebar>
    </PageLayout>
}