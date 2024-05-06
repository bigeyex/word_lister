import { NEW_WORD_TODAY } from '@/constants/globals'
import wordBooks from '@/constants/wordBooks'
import { Dispatch, GetState, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { dayOfToday } from './userProfile'
import { RootState } from './store'
import { AppThunk } from './hooks'
import { loadWordBook } from './plan'

const revisitCycle = [0, 1, 3, 7, 14, 29]
const SHORT_LIST_SIZE = 20
const NUM_SHORT_LIST_IN_BIG_LIST = 10

export interface WordListItemType {
    name: string,
    desc: string[],
    favorited: boolean,
    wordIndex: number,
}

export type TaskInfoType = {day:number, isRevisit:boolean}
export interface WordListStates {
    wordList: WordListItemType[]
    taskInfo: TaskInfoType 
    loading: boolean
}
const initialState: WordListStates = { wordList: [], taskInfo: {day: 0, isRevisit: false}, loading: true }

export const wordListSlice = createSlice({
    name: 'wordList',
    initialState: initialState,
    reducers: {
        setWordList: (state, action: PayloadAction<{wordList: WordListItemType[], taskInfo: TaskInfoType}>) => {     //payload: { bookKey, planDays, finishedDays, lastFinishDate, revisitedDays:number[] }
            state.wordList = action.payload.wordList
            state.taskInfo = action.payload.taskInfo
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const index = action.payload
            state.wordList.filter(w => w.wordIndex === index)
                .forEach(w => { w.favorited = !w.favorited })
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
    }
})

export const { setWordList, toggleFavorite, setLoading } = wordListSlice.actions

interface MakeWordListPayloadType { 
    bookKey: string, 
    planDays: number, 
    dayIndex: number, 
    isRevisit: boolean,
    favoratedIndices: number[],
}

export interface WordBookItemType { name:string, desc:string[] }
export type WordBookFileType = { default:WordBookItemType[] }
export const makeWordList = ({bookKey, planDays, dayIndex, isRevisit, favoratedIndices}: MakeWordListPayloadType):AppThunk => {
    return async (dispatch, getState) => {

        console.log('making list', bookKey, planDays, dayIndex, isRevisit, favoratedIndices)
        dispatch(setLoading(true))
        const wordBook = await dispatch(loadWordBook({ bookKey }))
        if (!wordBook) return
        const wordCount = wordBook.length
        const wordsPerDay = Math.floor(wordCount / planDays)
        const startWordIndex = wordsPerDay * dayIndex

        const wordsInTheList = wordBook.slice(startWordIndex, startWordIndex+wordsPerDay)
        let result:WordListItemType[] = []
        const favoritedIndicesMap = Object.fromEntries(favoratedIndices.map(i => [i, true]))
        const appendWordsToResult = (startIndex:number, length:number) => {
            const appendRange = wordsInTheList.slice(startIndex, startIndex+length)
            const appendWordItems:WordListItemType[] = appendRange.map((word, i) => {
                const wordIndex = startWordIndex + startIndex + i
                return {
                    name: word.name, 
                    desc: word.desc, 
                    favorited: wordIndex in favoritedIndicesMap, 
                    wordIndex: wordIndex
                }

            })
            result = result.concat(appendWordItems)
        }
        for(let i=0; i<wordsInTheList.length; i+=SHORT_LIST_SIZE) {
            appendWordsToResult(i, SHORT_LIST_SIZE)
            if (!isRevisit) {
                appendWordsToResult(i, SHORT_LIST_SIZE)
            }
        }
        dispatch(setWordList({wordList: result, taskInfo: {day: dayIndex, isRevisit: isRevisit}}))
        dispatch(setLoading(false))
    }
}


export default wordListSlice.reducer