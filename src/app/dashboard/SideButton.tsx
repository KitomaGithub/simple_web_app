"use client"

import Link from "next/link"

export default function SideButton({text, link} : Props){
    return <Link href={link} className="text-xl font-bold w-full border-1 py-3 rounded-lg text-center hover:bg-gray-200 hover:shadow-lg">
        {text}
    </Link>
}

interface Props {
    text?: string,
    link: string
}