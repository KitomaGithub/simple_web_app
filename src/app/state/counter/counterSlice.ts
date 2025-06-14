import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
    name: string;
}

const initialState: CounterState = {
    value: 0,
    name: "Neutral",
};

const counterSlice = createSlice({
    name: "counter",
    initialState: initialState,
    reducers: {
        increment: (state) => {
            if (state.value < 10) {
                state.name = "Inc";
                state.value += 1;
            }
        },
        decrement: (state) => {
            if (state.value != 0) {
                state.name = "Dec";
                state.value -= 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase( incAsync.fulfilled, (state) => {
                state.value += 1;
            })
    }
})

export const incAsync = createAsyncThunk(
    "counter/incAsync",
    async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
);

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;