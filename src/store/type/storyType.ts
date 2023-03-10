import { refreshStories, setOneStory, setStory, setStoryIds } from '../action/storyAction'

export type SetStoryIdsType = ReturnType<typeof setStoryIds>
export type SetStoryType = ReturnType<typeof setStory>
export type SetOneStoryType = ReturnType<typeof setOneStory>
export type RefreshStoriesType = ReturnType<typeof refreshStories>

export type ActionStoryType = SetStoryIdsType | SetStoryType | SetOneStoryType | RefreshStoriesType
