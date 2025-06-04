import { configureStore } from "@reduxjs/toolkit";
import newsReducre from './slices/newsSlice.js'
export const store = configureStore({
    reducer:{
        news: newsReducre,
    }
})