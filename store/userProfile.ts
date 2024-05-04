import { createSlice } from '@reduxjs/toolkit'

export interface UserProfileStates {
    currentBookKey:string,
    progressByBook:{
        [key: string]: {
            planDays: number, 
            finishedDays: number,
        }
    },
}

const initialState: UserProfileStates = { currentBookKey: '', progressByBook: {} }

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialState,
    reducers: {
        changeUserBook: (state, {payload}) => {
            state.currentBookKey = payload.key;
            state.progressByBook[payload.key] = {
                planDays: payload.planDays, 
                finishedDays: (!payload.clearProgress && payload.key in state.progressByBook && state.progressByBook[payload.key].finishedDays) ? 
                    state.progressByBook[payload.key].finishedDays : 0
            }
        }
    }
})

export const { changeUserBook } = userProfileSlice.actions
export default userProfileSlice.reducer