import { IStory } from '../../models/IStory'

export const setStoryIds = (ids: number[]) => {
  return { type: 'STORY/SET-STORY-IDS', ids } as const
}
export const setStory = (story: IStory) => {
  return { type: 'STORY/SET-STORY', story } as const
}
