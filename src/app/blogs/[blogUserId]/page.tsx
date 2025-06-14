"use client";

import BlogCard from "@/app/component/BlogCard";
import PageLayout from "@/app/component/PageLayout";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

export default function BlogList ({
    params
} : {
    params: Promise<{blogUserId : string}>
}) {

    const [blogUserId, setBlogUserId] = useState<string>("");
    const [blogs, setBlogs] = useState<Props[]>([]);

    const initialize = useCallback(async () => {

        const userId = (await params).blogUserId
        setBlogUserId(userId);

        const {data} = await supabase.from("blogs").select("*").eq("author", userId).order("created_at", {"ascending": false});
        if(data != null){
            setBlogs(data)
        }
    }, [params])

    const [didItRun, setDidItRun] = useState<boolean>( false);
    useEffect(() => {
        if(!didItRun){
            initialize();
            setDidItRun(true);
        } 
    },[didItRun, initialize])

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(6);

    return blogUserId == "" ? "" :  <PageLayout title={`${blogUserId}'s Blog`} inDashboard={false}>
        <div className="flex flex-col h-full">
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
                    Array.from({length: Math.round(blogs.length / 5)}).map((a, i) => {
                        
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
        </div>
    </PageLayout>
}

interface Props {
    content?: string,
    title? : string,
    id?: string | number,
    author?: string,
    created_at?: string;
}