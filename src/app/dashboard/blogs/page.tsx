"use client";

import PageLayout from "@/app/component/PageLayout";
import Sidebar from "../Sidebar";
import BlogCard from "@/app/component/BlogCard";
import { RootState } from "@/app/state/store";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { setUserBlog } from "@/app/state/blogs/blogSlice";

export default function BlogsDashboard(){

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const blogs = useSelector((state: RootState) => state.blogs.content);

    const [didItRun, setDidItRun] = useState<boolean>(false);
    useEffect(() => {

        async function getBlogs() {
            const {data} = await supabase.from("blogs").select("*").eq("author", user.username).order("created_at", {"ascending" : false});
            // const sessopm = await supabase.auth.getSession();
            dispatch(setUserBlog(data))
        }
        
        if(!didItRun){
            setDidItRun(true);
            getBlogs();
        }
        

    }, [user.username, didItRun, dispatch])

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(6);
    return <PageLayout title="My Dashboard" inDashboard={true}>
        <Sidebar >
            <div className="text-2xl font-bold">
                My Blogs
            </div>
            <div className="my-3 grid grid-cols-2 grid-rows-3 gap-x-10 gap-y-5 px-10 py-2 flex-1">
                {
                    blogs.map((blog, i) => {
                        if(i >= min && i < max){
                            const blogDate: string = blog.created_at != undefined ? blog.created_at : "";
                            const d = new Date(blogDate);

                            return <BlogCard
                                key={i} title={blog["title"]} author={blog["author"]} id={blog["id"]} content={blog["content"]} created_at={d.toLocaleDateString() + " " + d.toLocaleTimeString()}
                            />
                        }
                    })
                }
            </div>
            <div className="flex justify-center gap-2 h-14">
                {
                    Array.from({length: Math.round(blogs.length / 5) + (blogs.length % 5 == 0 ? 1 : 0)}).map((a, i) => {
                        
                        let m = 0;
                        let x = 6;

                        if (i > 0){
                            m += 6 * i;
                            x += 6 * i
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
        </Sidebar>
    </PageLayout>
}
