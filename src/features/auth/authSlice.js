import {createSlice} from '@reduxjs/toolkit';

const initialState={
    
    user:null,
    isLoggedIN:false,
    isLoading:false,
    error:null,
    success:false,
    accessToken:null,
    refreshToken:null


}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.isLoading=true;
            state.error=null;
            state.success=false;
        } ,
        loginSuccess:(state,action)=>{
            state.isLoading=false;
            state.user=action.payload.user;
            state.accessToken=action.payload.accessToken;
            state.refreshToken=action.payload.refreshToken;
            state.isLoggedIN=true;
            state.success=true;
            state.error=null;
        },
        loginFailure:(state,action)=>{
            state.isLoading=false;
            state.error=action.payload;
            state.success=false;
        },
        logOut:(state)=>{
            state.isLoading=false;
            state.user=null;
            state.isLoggedIN=false;
            state.accessToken=null;
            state.refreshToken=null;
            state.success=false;
            state.error=null;

        }
    }
})

export const {loginStart,loginFailure,loginSuccess,logOut}=authSlice.actions;
export default authSlice.reducer;