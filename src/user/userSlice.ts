import { type PayloadAction, createAction, createSelector, createSlice } from '@reduxjs/toolkit'
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

// export const userSelector = (state: PlayerRootState): UserState => state.user