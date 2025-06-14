import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface blogContent {
    id? : string,
    title?: string,
    content?: string,
    author?: string,
    created_at?: string,
    updated_at?: string
}

interface BlogState {
    content: blogContent[],
}

const initialState: BlogState = {
    content: [],
}

const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        setUserBlog: (state, action: PayloadAction<blogContent[] | null>) => {
            state.content = [];
            if (action.payload != null){
                action.payload.map(data => {
                    state.content.push(data)
                })
            }
        }, 
    }
});

export type BlogContent = blogContent;
export const { setUserBlog } = blogSlice.actions;
export default blogSlice.reducer;