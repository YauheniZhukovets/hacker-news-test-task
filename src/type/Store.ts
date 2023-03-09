import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { store } from '../store/store'
import { ActionAppType } from '../store/type/appType'
import { ActionStoryType } from '../store/type/storyType'

export type AppAction = ActionAppType | ActionStoryType

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppAction
>