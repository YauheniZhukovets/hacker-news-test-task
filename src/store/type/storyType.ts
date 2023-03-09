import { setStory, setStoryIds } from '../action/storyAction'

export type SetStoryIdsType = ReturnType<typeof setStoryIds>
export type SetStoryType = ReturnType<typeof setStory>

export type ActionStoryType = SetStoryIdsType | SetStoryType
