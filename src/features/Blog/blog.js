import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       title:"",
      content:[],
      tags:[],
      banner:"",
      des:"",
      author: {
          _id: "",
          personal_info: {}
    },
    publishedAt: "",
    blog_id: "",
   
    _id: "",
    activity: {
        total_likes: 0,
        total_comments: 0,
        total_reads: 0,
        total_parent_comments: 0
    }

      
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
        },
        setPublishedAt: (state, action) => {
            state.publishedAt = action.payload;
        },
        setBlogId: (state, action) => {
            state.blog_id = action.payload;
        },
        setId: (state, action) => {
            state._id = action.payload;
        },
        setActivity: (state, action) => {
            state.activity = action.payload;
        }
        ,        setBlog: (state, action) => {
            const { title, content, tags, banner, des, author, publishedAt, blog_id, blogid, _id, activity } = action.payload;
            state.title = title;
            state.content = content;
            state.tags = tags;
            state.banner = banner;
            state.des = des;
            state.author = author;
            state.publishedAt = publishedAt;
            state.blog_id = blog_id;
            state.blogid = blogid;
            state._id = _id;
            state.activity = activity;
        },
        reset:(state)=>{
            state.title = "";
            state.content = [];
            state.tags = [];
            state.banner = "";
            state.des = "";
            state.author = {
                _id: "",
                personal_info: {}
            };
            state.publishedAt = "";
            state.blog_id = "";
            state.blogid = "";
            state._id = "";
            state.activity = {
                total_likes: 0,
                total_comments: 0,
                total_reads: 0,
                total_parent_comments: 0
            };
        },
        handleLike: (state) => {
            state.activity.total_likes += 1;
        }
    },

        

});
export const { setTitle, setContent, setTags, setBanner, setDes, setAuthor, setPublishedAt, setBlogId, setId, setActivity, setBlog, reset } = blogSlice.actions;

export default blogSlice.reducer;