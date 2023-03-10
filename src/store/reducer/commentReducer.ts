import { ActionCommentType } from '../type'

import { IComment } from 'models'

const initialState = {
  comments: [] as IComment[],
}

export type InitialStateCommentType = typeof initialState

export const commentReducer = (
  state = initialState,
  action: ActionCommentType
): InitialStateCommentType => {
  switch (action.type) {
    case 'COMMENT/SET-COMMENT': {
      return { ...state, comments: [...state.comments, action.comment] }
    }
    case 'COMMENT/REFRESH-COMMENT': {
      return { ...state, comments: [] }
    }
    default:
      return state
  }
}
