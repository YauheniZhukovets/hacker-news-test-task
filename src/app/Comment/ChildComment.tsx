import React, { FC, memo, useEffect, useState } from 'react'

import { Avatar, List, Spin } from 'antd'
import axios from 'axios'

import { useAppDispatch } from 'hooks'
import { IComment } from 'models'
import { CommentService } from 'service'
import { mapTime } from 'shared'
import { setError, setStatus } from 'store'
import { NullAnd } from 'type'

type ChildCommentType = {
  cId: number
}

export const ChildComment: FC<ChildCommentType> = memo(({ cId }) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState<NullAnd<IComment>>(null)

  useEffect(() => {
    dispatch(setStatus('loading'))
    CommentService.fetchComment(cId)
      .then(res => {
        setComment(res.data)
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
  }, [])

  return (
    <div style={{ width: '80%', margin: '20px 0 0 30px' }}>
      {comment ? (
        <>
          <List.Item.Meta
            avatar={<Avatar />}
            title={comment.by}
            description={mapTime(comment.time)}
          />
          {comment.text}
        </>
      ) : (
        <div style={{ height: '100%' }}>
          <Spin />
        </div>
      )}
    </div>
  )
})
