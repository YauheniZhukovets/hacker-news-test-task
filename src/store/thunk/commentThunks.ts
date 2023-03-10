import axios from 'axios'

import { setComment, setError, setStatus } from '../action'

import { CommentService } from 'service'
import { AppThunk } from 'type'

export const fetchComments =
  (ids: number[]): AppThunk =>
  async dispatch => {
    dispatch(setStatus('loading'))
    const requests = ids.map(cId => CommentService.fetchComment(Number(cId)))

    Promise.all(requests)
      .then(res => {
        res.map(comment => dispatch(setComment(comment.data)))
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
