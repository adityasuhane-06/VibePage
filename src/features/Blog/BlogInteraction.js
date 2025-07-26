import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    total_likes: 0,
    total_comments: 0,
    total_reads: 0,
    isLiked: false,
    isBookmarked: false
};

const blogInteractionSlice = createSlice({
    name: "blogInteraction",
    initialState,
    reducers: {
        likePost: (state) => {
            if (state.isLiked) {
                state.total_likes -= 1;
                state.isLiked = false;
            } else {
                state.total_likes += 1;
                state.isLiked = true;
            }
        },
        unlikePost: (state) => {
            if (state.total_likes > 0) {
                state.total_likes -= 1;
            }
            state.isLiked = false;
        },
        commentOnPost: (state) => {
            state.total_comments += 1;
        },
        readPost: (state) => {
            state.total_reads += 1;
        },
        setInitialStats: (state, action) => {
            const { total_likes, total_comments, total_reads } = action.payload;
            state.total_likes = total_likes || 0;
            state.total_comments = total_comments || 0;
            state.total_reads = total_reads || 0;
        },
        toggleBookmark: (state) => {
            state.isBookmarked = !state.isBookmarked;
        },
        resetInteractions: (state) => {
            state.total_likes = 0;
            state.total_comments = 0;
            state.total_reads = 0;
            state.isLiked = false;
            state.isBookmarked = false;
        }
    }
});

export const { 
    likePost, 
    unlikePost, 
    commentOnPost, 
    readPost, 
    setInitialStats, 
    toggleBookmark, 
    resetInteractions 
} = blogInteractionSlice.actions;

export default blogInteractionSlice.reducer;