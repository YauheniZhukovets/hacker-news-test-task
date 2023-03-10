import { IStory } from '../../models/IStory'
import { ActionStoryType } from '../type/storyType'

const initialState = {
  ids: [] as number[],
  story: {} as IStory,
  stories: [] as IStory[],
  maxStories: 100,
  startValue: 0,
}

export type InitialStateStoryType = typeof initialState

export const storyReducer = (
  state = initialState,
  action: ActionStoryType
): InitialStateStoryType => {
  switch (action.type) {
    case 'STORY/SET-STORY-IDS': {
      return { ...state, ids: action.ids }
    }
    case 'STORY/SET-STORY': {
      return { ...state, stories: [...state.stories, action.story] }
    }
    case 'STORY/SET-ONE-STORY': {
      return { ...state, story: action.story }
    }
    case 'STORY/REFRESH': {
      return { ...state, stories: [], ids: [] }
    }
    default:
      return state
  }
}
