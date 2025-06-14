"use client";

import PageLayout from "@/app/component/PageLayout";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import sanitize from "sanitize-html";

export default function BlogPage ({
    params
} : {
    params: Promise<{blogUserId : string, blogId : string}>
}) {

    const [blogUserId, setBlogUserId] = useState<string>("");
    const [blogId, setBlogId] = useState<string>("");
    const [blog, setBlog] = useState<Props>({});

    async function initialize(){

        const userId = (await params).blogUserId
        const id = (await params).blogId
        setBlogUserId(userId);
        setBlogId(id);

        const {data} = await supabase.from("blogs").select("*").eq("author", userId).eq("id", id);
        
        if(data?.length > 0) {
            setBlog(data[0])
        } else {
            window.location.href = "/blogs"
        }
    }

    const [didItRun, setDidItRun] = useState<boolean>( false);
    useEffect(() => {
        if(!didItRun){
            initialize();
            setDidItRun(true);
        } 
    })

    return !didItRun ? "" : <PageLayout title={`${blogUserId}'s Blog`}>
        <div className="text-lg pl-10 pt-5">
            <button onClick={() => window.history.back()} className="ml-5 border-1 px-4 py-2 rounded-4xl cursor-pointer">
                &lt; Back
            </button>
        </div>
        <div className="text-4xl font-bold mx-56 pb-2 mb-2 border-b-2 border-slate-400">
            {blog.title}
        </div>
        <div className="px-64 py-4 indent-5 text-lg"
            dangerouslySetInnerHTML={{ __html: sanitize(blog.content)}}
        />
    </PageLayout>
}


interface Props {
    content?: string,
    title? : string,
    id?: string | number,
    author?: string,
    created_at?: string;
}