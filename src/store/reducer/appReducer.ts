import { StatusType } from '../../type/Common'
import { NullAnd } from '../../type/NullAnd'
import { ActionAppType } from '../type/appType'

const initialState = {
  status: 'idle' as StatusType,
  error: null as NullAnd<string>,
}

export type InitialStateAppType = typeof initialState

export const appReducer = (state = initialState, action: ActionAppType): InitialStateAppType => {
  switch (action.type) {
    case 'APP/SET-STATUS': {
      return { ...state, status: action.status }
    }
    case 'APP/SET-ERROR': {
      return { ...state, error: action.error }
    }
    default:
      return state
  }
}
