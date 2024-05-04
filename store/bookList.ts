import { createSlice } from '@reduxjs/toolkit'
import WordBooks from '@/constants/wordBooks'

export interface BookListStates {
    selectedBookKey: string,
 
    planDays: number, 
    clearProgress: boolean,
}

const initialState: BookListStates = { selectedBookKey: '', planDays: 20, clearProgress: false }

export const userProfileSlice = createSlice({
    name: 'bookList',
    initialState: initialState,
    reducers: {

        setBookKey: (state, {payload}) => {
            state.selectedBookKey = payload
        },

        setPlanDays: (state, {payload}) => {
            state.planDays = payload
        },

        toggleClearProgress: (state) => {
            state.clearProgress = !state.clearProgress
        },
    }
})

export const { setBookKey, setPlanDays, toggleClearProgress } = userProfileSlice.actions
export default userProfileSlice.reducer