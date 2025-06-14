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
        <Sidebar >
            <div className="text-2xl font-bold">
                My Blogs
            </div>
            <div className="grid grid-cols-2 gap-6 px-4 py-3">
                {
                    blogs.map((blog, i) => <BlogCard
                        title={blog.title} 
                        content={blog.content}
                        key={i}
                    />)
                }
            </div>
            <div className="flex justify-center pb-5 mt-4">
                Pagination
            </div>
        </Sidebar>
    </PageLayout>
}
