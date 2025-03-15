import { type PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { AppRootState } from '../store'
export interface UserState {
    id?: string
    extAuthId?: string
    email?: string
    firstName?: string
    lastName?: string
}

export const initialUserState: UserState = {}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState | undefined>) => {
            const user = action.payload
            if (user) {
                state = { ...user }
            } else {
                state = initialUserState
            }
        }
    }
})

export const userSelector = (state: AppRootState): UserState => state.user

export const userSelectors = {
    id: createSelector(userSelector, (state) => state.id),
    extAuthId: createSelector(userSelector, (state) => state.extAuthId),
    email: createSelector(userSelector, (state) => state.email),
    firstName: createSelector(userSelector, (state) => state.firstName),
    lastName: createSelector(userSelector, (state) => state.lastName),
}

export default userSlice.reducer