import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { ActionAppType, ActionCommentType, ActionStoryType, store } from 'store'

export type AppAction = ActionAppType | ActionStoryType | ActionCommentType

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppAction>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AppAction
>
