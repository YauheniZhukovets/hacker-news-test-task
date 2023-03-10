import React, { FC, memo, useState } from 'react'

import { Avatar, List } from 'antd'

import { ChildComment } from './ChildComment'

import { IComment } from 'models'
import { mapTime } from 'shared'

type CommentType = {
  comment: IComment
  index: number
}

export const Comment: FC<CommentType> = memo(({ comment, index }) => {
  const [show, setShow] = useState<boolean>(false)

  const onClickChildShowComments = () => {
    setShow(prevState => !prevState)
  }

  return (
    <List.Item key={comment.id} onClick={onClickChildShowComments}>
      <List.Item.Meta
        avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
        title={
          comment.kids ? (
            <div style={{ cursor: 'pointer' }}>
              {comment.by} <span style={{ color: 'blue' }}>reply...</span>{' '}
            </div>
          ) : (
            comment.by
          )
        }
        description={mapTime(comment.time)}
      />
      {comment.text}

      {show && comment.kids ? (
        <>
          {comment.kids.map(id => (
            <ChildComment key={id} cId={id} />
          ))}
        </>
      ) : (
        <></>
      )}
    </List.Item>
  )
})
