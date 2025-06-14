"use client";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/state/store";
import { createBlog } from "@/app/state/blogs/blogSlice";

export default function Welcome() {

    const blogContent = useSelector((state: RootState) => state.blogs.content)
    const dispatch = useDispatch<AppDispatch>();

    const date = new Date();

    const addBlog = () => {
        dispatch(createBlog({
            title: "testing Title",
            content: "Content " + Math.random().toFixed(5),
            created_at: date.toDateString()
        }))
    }

    return (
    <div className="flex justify-center items-center h-svh flex-col gap-3">
        <div className="flex gap-2 h-[500px] overflow-scroll flex-col p-4 border-1 w-[600px] items-center ">
        {blogContent.map((content, key) => {
            if(key < 10) {
                return (
                <div className="p-2 border-1 w-[350px]" key={key}>
                    <div>
                    Title: {content.title + " " + (key+1)}
                    </div>
                    <div>
                    {content.content}
                    </div>
                    <div>
                    created at: {content.created_at}
                    </div>
                </div>
                )
            }
            }
        )}
        </div>
        <div className="flex gap-2">
        <button className="border-1 px-3 py-1 rounded-md" onClick={() => addBlog()}>
            Add Blog
        </button>
        </div>
    </div>
    );
}