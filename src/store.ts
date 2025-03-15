
import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userSlice } from './user/userSlice'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const appRootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
})

const store = configureStore({
    reducer: appRootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([sagaMiddleware]),
    devTools: true,
})

sagaMiddleware.run(rootSaga)

export type AppRootState = ReturnType<typeof store.getState>

export type AppDisptach = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
export const useAppDisptach: () => AppDisptach = useDispatch

export default store