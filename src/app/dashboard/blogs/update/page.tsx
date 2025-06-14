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
            const {data: blogs} = await supabase.from("blogs").select("*").eq("author", user.username).order("created_at", {"ascending": false});
            // const sessopm = await supabase.auth.getSession();
            dispatch(setUserBlog(blogs))
        }
        
        if(!didItRun){
            setDidItRun(true);
            getBlogs();
        }
        

    }, [user.username, didItRun, dispatch])

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5);

    return <PageLayout title="My Dashboard" inDashboard={true}>
        <Sidebar>
            <div className="flex flex-col h-full">
                <div className="text-2xl font-bold">
                    Update a Blog
                </div>
                <div className="flex flex-col gap-3 flex-1">
                    {
                        blogs.map((blog, i) => {
                            
                            if(i >= min && i < max){
                                return <div key={i} className="flex">
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
                            }

                        })
                    }
                </div>
                <div className="flex justify-center gap-2 h-14">
                    {
                        Array.from({length: Math.round(blogs.length / 5) + (blogs.length % 5 == 0 ? 0 : 1)}).map((a, i) => {
                            
                            let m = 0;
                            let x = 5;

                            if (i > 0){
                                m += 5 * i;
                                x += 5 * i
                            }
                            
                            return <button key={i}
                                className="text-lg h-10 w-10 border-1 rounded-4xl"
                                onClick={() => {setMin(m); setMax(x)}}
                            >
                                {i + 1}
                            </button>
                        })
                    }
                </div>
            </div>
        </Sidebar>
    </PageLayout>
}