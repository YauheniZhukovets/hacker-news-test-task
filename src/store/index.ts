export { store } from './store'

export type {
  ActionStoryType,
  SetStoryIdsType,
  SetOneStoryType,
  RefreshStoriesType,
  SetStoryType,
  SetCommentType,
  refreshCommentType,
  ActionCommentType,
  SetStatusType,
  SetErrorType,
  ActionAppType,
} from './type'

export {
  refreshStories,
  setStory,
  setOneStory,
  setStoryIds,
  setStatus,
  setComment,
  refreshComment,
  setError,
} from './action'

export { fetchStory, fetchStoryIds, fetchStories, fetchComments } from './thunk'

export { commentReducer, storyReducer, appReducer } from './reducer'
