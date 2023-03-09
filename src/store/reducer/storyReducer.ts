import { ActionStoryType } from '../type/storyType'

const initialState = {
  ids: [] as number[],
}

export type InitialStateAppType = typeof initialState

export const storyReducer = (
  state = initialState,
  action: ActionStoryType
): InitialStateAppType => {
  switch (action.type) {
    case 'STORY/SET-STORY-IDS': {
      return { ...state, ids: action.ids }
    }
    default:
      return state
  }
}
