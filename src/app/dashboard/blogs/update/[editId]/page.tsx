"use client";

import PageLayout from "@/app/component/PageLayout";
import Tiptap from "@/app/component/TipTap";
import Sidebar from "@/app/dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@/app/state/store";
import { setUserBlog } from "@/app/state/blogs/blogSlice";
import { supabase } from "@/utils/supabase";


export default function BlogList ({
    params
} : {
    params: Promise<{editId : string}>
}) {

    const [editorContent, setEditorContent] = useState("");

    const [title, setTitle] = useState<string>("");

    const [editId, setEditId] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [currentBlog, setCurrentBlog] = useState("")

    const [didItRun, setDidItRun] = useState<boolean>(false);
    useEffect(() => {

        async function getBlogs() {
            const {data: blogs} = await supabase.from("blogs").select("*").eq("author", user.username).order("created_at", {ascending: true});
            // const sessopm = await supabase.auth.getSession();
            dispatch(setUserBlog(blogs))
            const id = (await params).editId;
            
            if(blogs?.filter(r => r.id == id).length == 0) {
                window.location.href = "/dashboard/blogs/update"
            }

            setCurrentBlog(blogs?.filter(r => r.id == id)[0].content)
            setTitle(blogs?.filter(r => r.id == id)[0].title)
            setEditorContent(blogs?.filter(r => r.id == id)[0].content)
            setEditId(id);
        }

        if(!didItRun){
            setDidItRun(true);
            getBlogs();
        }
        

    }, [user.username, didItRun, dispatch, params])

    function setContent(data: string) {
        setEditorContent(data);
    }

    const updateBlog = async () => {
        const {error} = await supabase.from("blogs").update({title: title, content: editorContent, updated_at: new Date().toISOString()}).eq("id", editId).select()

        if(error == null) {
            window.location.href = "/dashboard/blogs/update"
        }
    }

    return editId == "" ? "" : <PageLayout title="My Dashboard" inDashboard={true}>
        <Sidebar>
            <div className="text-2xl font-bold">
                Create your Blog {editId}
            </div>
            <div className="flex flex-col">
                
                <label className="block my-4">
                    <span className="block text-xl uppercase font-bold">Title</span>
                    <input value={title} onChange={inp => setTitle(inp.currentTarget.value)} className="border-1 w-full my-1 text-xl px-3 py-3 rounded-xl focus:ring-0 focus:outline-0"/>
                </label>

                <label className="block my-4">
                    <span className="block text-xl uppercase font-bold">Content</span>
                    <Tiptap content={currentBlog} getContent={setContent} className="border-1 p-3 rounded-2xl min-h-60 focus:ring-0 focus:outline-none text-xl"/>
                </label>
            </div>
            <button onClick={updateBlog} className="text-xl border-1 uppercase w-full py-4 rounded-xl cursor-pointer hover:shadow-xl hover:bg-gray-200">
                Update Blog
            </button>
        </Sidebar>
    </PageLayout>
}