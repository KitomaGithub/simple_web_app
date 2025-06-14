"use client";

import PageLayout from "@/app/component/PageLayout";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";
import sanitize from "sanitize-html";

export default function BlogPage ({
    params
} : {
    params: Promise<{blogUserId : string, blogId : string}>
}) {

    const [blogUserId, setBlogUserId] = useState<string>("");
    const [blog, setBlog] = useState<Props>({});
    const [blogContent, setBlogContent] = useState("");
    const [blogDate, setBlogDate] = useState("");

    const initialize = useCallback(async () => {

        const userId = (await params).blogUserId
        const id = (await params).blogId
        setBlogUserId(userId);

        const {data} = await supabase.from("blogs").select("*").eq("author", userId).eq("id", id);
        
        if(data != null) {
            if(data?.length > 0) {
                setBlog(data[0])
                setBlogContent(data[0].content)
                setBlogDate(new Date(data[0].created_at).toLocaleDateString())
            } else {
                window.location.href = "/blogs"
            }
        }
    }, [params])

    const [didItRun, setDidItRun] = useState<boolean>( false);
    useEffect(() => {
        if(!didItRun){
            initialize();
            setDidItRun(true);
        } 
    }, [didItRun, initialize])

    return !didItRun ? "" : <PageLayout title={`${blogUserId}'s Blog`}>
        <div className="text-lg pl-10 pt-5">
            <button onClick={() => window.history.back()} className="ml-5 border-1 px-4 py-2 rounded-4xl cursor-pointer">
                &lt; Back
            </button>
        </div>
        <div className="text-4xl font-bold mx-56 pb-2 mb-2 border-b-2 border-slate-400">
            {blog.title}
        </div>
        <div className="text-sm mx-60">
            Posted by: <b>{blog.author}</b> at: <b>{blogDate}</b>
        </div>
        <div className="px-64 py-6 text-lg"
            dangerouslySetInnerHTML={{ __html: sanitize(blogContent)}}
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