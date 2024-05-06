import { NEW_WORD_TODAY } from '@/constants/globals'
import wordBooks from '@/constants/wordBooks'
import { Dispatch, GetState, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { dayOfToday, saveTaskFinish } from './userProfile'
import { WordBookItemType } from './wordList'
import { RootState } from './store'
import { AppThunk } from './hooks'

const revisitCycle = [0, 1, 3, 7, 14, 29]

export interface Task {
    day: number,
    isRevisit: boolean,
    finished: boolean,
}

function makeDailyPlan(dayIndex:number, maxDays:number): Task[] {
    let result:Task[] = []
    if (dayIndex < maxDays) {
        result.push({day: dayIndex, isRevisit: false, finished: false})
    }
    result = result.concat(revisitCycle.filter(x => x<=dayIndex)            // only revisit learnt days
        .map(x => ({day: dayIndex-x, isRevisit: true, finished: false})))   
    return result
}

export interface PlanStates {
    todayTasks:Task[],
    tomorrowTasks:Task[],
    wordBookContent:WordBookItemType[],
    wordBookKey:string,
}
export interface MakePlanPayload {
    bookKey: string, 
    planDays: number, 
    finishedDays: number, 
    lastFinishDate: string, 
    revisitedDays: number[]
}
const initialState: PlanStates = { todayTasks: [], tomorrowTasks: [], wordBookKey: '', wordBookContent: [] }

export const planSlice = createSlice({
    name: 'plan',
    initialState: initialState,
    reducers: {
        makePlan: (state, action: PayloadAction<MakePlanPayload>) => {     //payload: { bookKey, planDays, finishedDays, lastFinishDate, revisitedDays:number[] }
            const payload = action.payload
            let dayIndex = dayOfToday(payload)
            console.log('list for day', dayIndex)
            let todayTasks = makeDailyPlan(dayIndex, payload.planDays)
            if(payload.lastFinishDate=== new Date().toLocaleDateString()){ // if today has all finished
                todayTasks.forEach(t => t.finished = true)
            }
            else {  // only mark finished tasks in finished list
                payload.revisitedDays.forEach((revisitedDay:number) => todayTasks                                  // for each revisited days...
                    .filter(t => (t.day == revisitedDay && t.isRevisit) || (revisitedDay === NEW_WORD_TODAY && !t.isRevisit) ) // find the task in revisit list if exists...
                    .forEach(t =>t.finished = true))                                                               // mark finished
            }
            state.todayTasks = todayTasks
            state.tomorrowTasks = makeDailyPlan(dayIndex+1, payload.planDays)
        },
        finishTaskInList: (state, action: PayloadAction<number>) => {   // payload: { day }
            if (action.payload === NEW_WORD_TODAY) {
                state.todayTasks.filter(t => !t.isRevisit).forEach(t => t.finished = true)
            }
            else {
                state.todayTasks.filter(t => t.day === action.payload).forEach(t => t.finished = true)
            }
        },
        setWordBook: (state, action:PayloadAction<{wordBookKey:string, wordBookContent:WordBookItemType[]}>) => {
            const payload = action.payload
            state.wordBookKey = payload.wordBookKey
            state.wordBookContent = payload.wordBookContent
        }
    }
})

export const { makePlan, finishTaskInList, setWordBook } = planSlice.actions
type LoadWordBookPayload = {bookKey: string}
export const loadWordBook = ({bookKey}: LoadWordBookPayload):AppThunk<Promise<WordBookItemType[]|undefined>> => {
    return async (dispatch, getState) => {
        const wordBookKey = getState().userProfile.currentBookKey
        if (wordBookKey === getState().plan.wordBookKey) {
            return getState().plan.wordBookContent
        }
        else {
            const wordBookFile = await wordBooks.find(b => b.key===bookKey)?.importFun();
            if (!wordBookFile) return
            dispatch(setWordBook({wordBookKey: wordBookKey, wordBookContent: wordBookFile.default}))
            return wordBookFile.default
        }
    }
}

export const finishTask = (payload: {day:number}):AppThunk<void> => {
    return (dispatch, getState) => {
        dispatch(finishTaskInList(payload.day))
        const finishToday = getState().plan.todayTasks.every(t => t.finished)
        dispatch(saveTaskFinish({taskDay: payload.day, finishToday: finishToday}))
    }
}

export default planSlice.reducer