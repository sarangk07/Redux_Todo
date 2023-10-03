import { configureStore } from "@reduxjs/toolkit";
import todostore from "./todostore";


export const store = configureStore({
    reducer:{
        list:todostore
    }
})