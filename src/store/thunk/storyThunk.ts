import axios from 'axios'

import { StoryService } from '../../service/StoryService'
import { AppThunk } from '../../type/Store'
import { setError, setStatus } from '../action/appAction'
import { setStoryIds } from '../action/storyAction'

export const fetchStoryIds = (): AppThunk => async dispatch => {
  try {
    dispatch(setStatus('loading'))
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
