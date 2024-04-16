import { configureStore } from '@reduxjs/toolkit'
import darkSlice from './slices/darkSlice';


const store = configureStore({
    reducer: {
        darkModeToggler: darkSlice
    }
});

export default store;