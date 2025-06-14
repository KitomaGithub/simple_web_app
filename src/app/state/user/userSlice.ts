import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    isSignedIn: boolean,
    email?: string,
    username?: string,
    id?: string
}

interface userData {
    email?: string,
    username?: string,
    id?: string
}

const initialState: userState = {
    isSignedIn: false,
    email: "",
    username: "",
    id: ""
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signedIn: (state, action: PayloadAction<userData>) => {
            state.isSignedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.id = action.payload.id;
        },
        signedOut: (state) => {
            state.isSignedIn = false;
            state.email = "";
            state.username = "";
            state.id = "";
        }
    }
})

export const { signedIn, signedOut } = userSlice.actions;
export default userSlice.reducer;