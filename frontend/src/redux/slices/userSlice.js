import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    firstName: "",
    lastName:"",
    username: "",
    email: "",
    profilepic: "",
    date: ""
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;