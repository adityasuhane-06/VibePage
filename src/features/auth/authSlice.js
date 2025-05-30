import {createSlice} from '@reduxjs/toolkit';

const initialState={
    data:{
    user:null,
    isLoggedIN:false,
    isLoading:false,
    error:null,
    success:false,
    accessToken:localStorage.getItem("accessToken")?localStorage.getItem("accessToken"):null,
    refreshToken:localStorage.getItem("refreshToken")?localStorage.getItem("refreshToken"):null,

}
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.data.isLoading=true;
            state.data.error=null;
            state.data.success=false;
        } ,
        loginSuccess:(state,action)=>{
            state.data.isLoading=false;
            state.data.user=action.payload.user;
            state.data.accessToken=action.payload.accessToken;
            state.data.isLoggedIN=true;
            state.data.success=true;
        },
        loginFailure:(state,action)=>{
            state.data.isLoading=false;
            state.data.error=action.payload;
            state.data.success=false;
        },
        logOut:(state)=>{
            state.data.isLoading=false;
            state.data.user=null;
            state.data.isLoggedIN=false;
            state.data.accessToken=null;
            state.data.refreshToken=null;
            state.data.success=false;
            state.data.error=null;
            localStorage.removeItem("accessToken");

        }
    }
})

export const {loginStart,loginFailure,loginSuccess,logOut}=authSlice.actions;
export default authSlice.reducer;