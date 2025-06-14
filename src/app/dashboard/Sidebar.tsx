"use client";

import { ReactNode } from "react";
import SideButton from "./SideButton";

export default function Sidebar ({children} : Props) {
    return <div className="flex h-full">
        <div className="h-full border-r-1 w-60 px-6 py-5 flex flex-col gap-3">
            <SideButton text="My Blogs" link={"/dashboard/blogs"}/>
            <SideButton text="Create Blogs" link={"/dashboard/blogs/create"}/>
            <SideButton text="Update Blogs" link={"/dashboard/blogs/update"}/>
            <SideButton text="Delete Blogs" link={"/dashboard/blogs/delete"}/>
        </div>
        <div className="flex-1 px-10 py-5">
            {children}
        </div>
    </div>
}

interface Props {
    readonly children? : ReactNode,
}