export const NEW_WORD_TODAY = -1    // refer to the new word list learnt for today

export function getTaskTitle(day:number, isRevisit:boolean):string {
    return `第${day+1}日${isRevisit?'复习':'新词'}`
}