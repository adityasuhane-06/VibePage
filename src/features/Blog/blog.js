import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       title:"",
      content:[],
      tags:[],
      banner:"",
      des:"",
      author:{personal_info:{}}
      
}

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setContent: (state, action) => {
            state.content = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setBanner: (state, action) => {
            state.banner = action.payload;
        },
        setDes: (state, action) => {
            state.des = action.payload;
        },
        setAuthor: (state, action) => {
            state.author = action.payload;
        }
    }
});
export const { setTitle, setContent, setTags, setBanner, setDes, setAuthor } = blogSlice.actions;

export default blogSlice.reducer;