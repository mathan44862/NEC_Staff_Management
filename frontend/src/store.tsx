    import { configureStore } from "@reduxjs/toolkit";
import { Apis } from "./apis/Apis";

    export const store = configureStore({
        reducer:{
            [Apis.reducerPath]:Apis.reducer 
        },
        middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(Apis.middleware)
    })

