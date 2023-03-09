import axios from 'axios'

import { CommentService } from '../../service/CommentService'
import { AppThunk } from '../../type/Store'
import { setError, setStatus } from '../action/appAction'
import { setComment } from '../action/commentAction'

export const fetchComments = (): AppThunk => async (dispatch, getState) => {
  dispatch(setStatus('loading'))
  const commentIds = getState().story.story.kids
  const requests = commentIds.map(cId => CommentService.fetchComment(Number(cId)))

  Promise.all(requests)
    .then(res => {
      res.map(comment => setComment(comment.data))
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
