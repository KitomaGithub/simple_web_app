"use client";

import sanitizeHtml from 'sanitize-html';

export default function EditCard ({title, content, id} : Props) {

    return<div className="h-30 flex flex-1 overflow-hidden border-1 transition-shadow rounded-xl">
        <div className="py-3 px-5 w-full" onClick={() => console.log(id)}>
            <div className="text-2xl font-bold mx-2 my-1 border-b-1 border-slate-500 w-full">
                {title}
            </div>
            <div className="text-md px-4 py-2 h-12 text-clip overflow-hidden" dangerouslySetInnerHTML={{__html: sanitizeHtml(content)}}/>
        </div>
    </div>
}

interface Props {
    content?: string,
    title? : string,
    id?: string | number
}