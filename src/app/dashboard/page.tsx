"use client";

import PageLayout from "../component/PageLayout";
import Sidebar from "./Sidebar";

export default function BlogDashboard(){

    window.location.replace("/dashboard/blogs")

    return <PageLayout title="My Dashboard">
        <Sidebar>
            My Blogs <br/>
        </Sidebar>
    </PageLayout>
}