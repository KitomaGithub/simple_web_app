"use client";

import sanitizeHtml from 'sanitize-html';

export default function BlogCard ({title, content, id,created_at, author} : Props) {

    return<div className="h-60 cursor-pointer overflow-hidden border-1 hover:shadow-lg transition-shadow rounded-xl">
        <div className="py-3 px-5" onClick={() => window.location.href = `/blogs/${author}/${id}`}>
            <div className="text-2xl font-bold mx-2 my-1 border-b-1 border-slate-500">
                {title}
            </div>
            <div className="text-md px-4 py-2 h-36 text-clip overflow-hidden" dangerouslySetInnerHTML={{__html: sanitizeHtml(content)}}/>
        </div>
        <div className="border-t-1 flex text-sm">
            <div className="flex-1 py-1 pl-3">
                Posted at: {created_at}
            </div>
            <div className="flex-1 flex justify-end py-1 pr-3">
                Click to view
            </div>
        </div>
    </div>
}

interface Props {
    content?: string,
    title? : string,
    id?: string | number,
    author?: string,
    created_at?: string;
}