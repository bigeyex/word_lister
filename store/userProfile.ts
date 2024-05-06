import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface UserProgressType {
    planDays: number, 
    finishedDays: number,
    lastFinishDate: string,
    revisitedDays: number[],
}

export interface UserProgressTypeWithFavorites extends UserProgressType {
    favoratedIndices: number[],
}

export interface ProgressByBookType {
    [key: string]: UserProgressTypeWithFavorites
}
export interface UserProfileStates {
    currentBookKey:string,
    progressByBook:ProgressByBookType,
}

const initialState: UserProfileStates = { currentBookKey: '', progressByBook: {} }

export const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialState,
    reducers: {
        changeUserBook: (state, {payload}) => { //payload: { key, planDays, clearProgress:boolean }
            state.currentBookKey = payload.key
            const shouldKeepProgress = !payload.clearProgress && payload.key in state.progressByBook
            state.progressByBook[payload.key] = {
                planDays: payload.planDays, 
                finishedDays: (shouldKeepProgress && state.progressByBook[payload.key]?.finishedDays) ? 
                    state.progressByBook[payload.key].finishedDays : 0,
                revisitedDays: (shouldKeepProgress && state.progressByBook[payload.key]?.revisitedDays) ? 
                    state.progressByBook[payload.key].revisitedDays : [],
                lastFinishDate: (shouldKeepProgress && state.progressByBook[payload.key]?.lastFinishDate) ?
                    state.progressByBook[payload.key].lastFinishDate : '', 
                favoratedIndices: (shouldKeepProgress && state.progressByBook[payload.key]?.favoratedIndices) ?
                    state.progressByBook[payload.key].favoratedIndices : [], 
            }
        },
        saveTaskFinish: (state, action:PayloadAction<{taskDay: number, finishToday: boolean}>) => {   
            const key = state.currentBookKey
            const taskDay = action.payload.taskDay
            
            state.progressByBook[key].revisitedDays.push(taskDay)
            if (action.payload.finishToday) {
                state.progressByBook[key].finishedDays += 1
                state.progressByBook[key].lastFinishDate = new Date().toLocaleDateString()
                state.progressByBook[key].revisitedDays = []
            }
        },
        saveFavourite: (state, action:PayloadAction<{wordIndex: number, isFavorated: boolean}>) => {  
            const wordIndex = action.payload.wordIndex
            const favoratedIndices = state.progressByBook[state.currentBookKey].favoratedIndices
                    .filter(x => x!==wordIndex)
            if (action.payload.isFavorated) {
                favoratedIndices.push(wordIndex)
            }
            state.progressByBook[state.currentBookKey].favoratedIndices = favoratedIndices
        },
    }
})

export function dayOfToday(progress: UserProgressType) {
    let dayIndex = progress.finishedDays
    if (progress.lastFinishDate === new Date().toLocaleDateString()) {
        dayIndex -= 1   // if it's finished today, bring back finishedDays to avoid make a plan of day+1
    }
    return dayIndex
}

export const { changeUserBook, saveTaskFinish, saveFavourite } = userProfileSlice.actions
export default userProfileSlice.reducer