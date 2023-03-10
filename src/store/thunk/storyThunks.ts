import axios from 'axios'

import { StoryService } from '../../service/StoryService'
import { AppThunk } from '../../type/Store'
import { setError, setStatus } from '../action/appAction'
import { refreshComment } from '../action/commentAction'
import { refreshStories, setOneStory, setStory, setStoryIds } from '../action/storyAction'

export const fetchStoryIds = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatus('loading'))
    dispatch(refreshStories())
    const res = await StoryService.fetchStoriesIds()

    dispatch(setStoryIds(res.data))
    dispatch(setStatus('succeeded'))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error = e.response
        ? e.response?.data?.message
        : e.message + ', more details in the console'

      dispatch(setError(error))
    }
    dispatch(setStatus('failed'))
  }
}

export const fetchStories = (): AppThunk => async (dispatch, getState) => {
  dispatch(setStatus('loading'))
  const storyIds = getState().story.ids
  const { maxStories, startValue } = getState().story

  const requests = storyIds
    .slice(startValue, maxStories)
    .map(sId => StoryService.fetchStory(Number(sId)))

  Promise.all(requests)
    .then(res => {
      res.map(story => dispatch(setStory(story.data)))
      dispatch(setStatus('succeeded'))
    })
    .catch(e => {
      if (axios.isAxiosError(e)) {
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    })
}

export const fetchStory =
  (id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatus('loading'))
      const res = await StoryService.fetchStory(Number(id))

      dispatch(refreshComment())
      dispatch(setOneStory(res.data))
      dispatch(setStatus('succeeded'))
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = e.response
          ? e.response?.data?.message
          : e.message + ', more details in the console'

        dispatch(setError(error))
      }
      dispatch(setStatus('failed'))
    }
  }
