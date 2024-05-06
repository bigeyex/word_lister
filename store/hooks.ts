import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'
import { ThunkAction, UnknownAction } from '@reduxjs/toolkit'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>