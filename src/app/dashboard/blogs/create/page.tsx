"use client";

import PageLayout from "@/app/component/PageLayout";
import Sidebar from "../../Sidebar";
import Tiptap from "@/app/component/TipTap";
import { useState } from "react";
import { supabase } from "@/utils/supabase";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state/store";


export default function BlogsCreate(){

    const [editorContent, setEditorContent] = useState("");
    const [title, setTitle] = useState("");

    const user = useSelector((state: RootState) => state.user)

    function setContent(data: string) {
        setEditorContent(data);
    }

    const createBlog = async () => {
        if(title != "" || editorContent != ""){
            const {error} = await supabase.from("blogs").insert([{
                "author" : user.username,
                "title" : title,
                "content" : editorContent
            }])

            if(error == null){
                window.location.href = "/dashboard/blogs"
            }
        } else {
            console.log("error")
        }
    }

    return <PageLayout title="My Dashboard" inDashboard={true}>
        <Sidebar>
            <div className="text-2xl font-bold">
                Create your Blog
            </div>
            <div className="flex flex-col">
                
                <label className="block my-4">
                    <span className="block text-xl uppercase font-bold">Title</span>
                    <input onChange={inp => setTitle(inp.currentTarget.value)} value={title} className="border-1 w-full my-1 text-xl px-3 py-3 rounded-xl focus:ring-0 focus:outline-0"/>
                </label>

                <label className="block my-4">
                    <span className="block text-xl uppercase font-bold">Content</span>
                    <Tiptap getContent={setContent} className="border-1 p-3 rounded-2xl min-h-60 focus:ring-0 focus:outline-none text-xl"/>
                </label>
            </div>
            <button onClick={createBlog} className="text-xl border-1 uppercase w-full py-4 rounded-xl cursor-pointer hover:shadow-xl hover:bg-gray-200">
                Create Blog
            </button>
        </Sidebar>
    </PageLayout>
}