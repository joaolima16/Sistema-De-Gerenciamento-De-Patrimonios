import { configureStore } from "@reduxjs/toolkit";
import Token from "../reducers/Token";
import NavData from '../reducers/NavigationData';
import GetValue from "../reducers/GetValue";
export default configureStore({
    reducer:{
        Token,
        NavData,
        GetValue
    },
});