import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '../components/heroesFilters/filtersSlice';
import { apiSlice } from '../api/apiSlice';

const stringMiddleware = () => (next) => (action) => {     // модифицируем dispatch аля redux-thunk (createThunkMiddleware)
    if (typeof action === 'string'){
        return next({
            type: action
        })
    } else {
        return next(action);
    }
};  

// const store = createStore(combineReducers({heroesReducer, filtersReducer}),  
//                           applyMiddleware(ReduxThunk, stringMiddleware));

const store = configureStore({
    reducer: {filtersReducer, [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;  