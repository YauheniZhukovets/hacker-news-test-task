import React, { FC, memo, useEffect, useState } from 'react'

import { ReloadOutlined } from '@ant-design/icons'
import { Button, List, message, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { Comment } from './Comment'

import { useAppDispatch, useAppSelector } from 'hooks'
import { IComment } from 'models'
import { fetchComments, refreshComment } from 'store'
import { StatusType } from 'type'

const { Title } = Typography

type CommentsPageType = {
  ids: number[]
  sId: number
}

export const CommentsPage: FC<CommentsPageType> = memo(({ ids, sId }) => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState<string>('')
  const comments = useAppSelector<IComment[]>(state => state.comment.comments)
  const status = useAppSelector<StatusType>(state => state.app.status)

  useEffect(() => {
    dispatch(fetchComments(ids))
  }, [sId])

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const refreshComments = async () => {
    dispatch(refreshComment())
    dispatch(fetchComments(ids))
  }

  const handleSubmit = () => {
    if (!text.trim().length) {
      message.error('Comment text is required')
    } else {
      setText('')
    }
  }

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
        <Title level={4}>Comments</Title>
        <Button disabled={!comments.length} onClick={refreshComments}>
          <ReloadOutlined />
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%',
          alignItems: 'center',
          margin: '0 auto',
          gap: 10,
        }}
      >
        <List
          itemLayout="vertical"
          style={{ width: '100%' }}
          dataSource={comments}
          renderItem={(item, i) => <Comment key={item.id} index={i} comment={item} />}
        />

        <TextArea
          value={text}
          showCount
          maxLength={600}
          style={{ height: 120, resize: 'none', width: '100%' }}
          onChange={onChangeTextArea}
          placeholder={'Enter your comment...'}
        />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={handleSubmit} disabled={status === 'loading'}>
            New Comment
          </Button>
        </div>
      </div>
    </Space>
  )
})
