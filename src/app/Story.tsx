import React, { FC, memo, useEffect, useState } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, List, Spin } from 'antd'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { IStory } from '../models/IStory'
import { StoryService } from '../service/StoryService'
import { mapTime } from '../shared/mapTime'
import { setError, setStatus } from '../store/action/appAction'
import { NullAnd } from '../type/NullAnd'

type StoryType = {
  storyId: number
  index: number
}
export const Story: FC<StoryType> = memo(({ storyId, index }) => {
  const dispatch = useAppDispatch()
  const [story, setStory] = useState<NullAnd<IStory>>(null)
  const ids = useAppSelector<number[]>(state => state.story.ids)

  useEffect(() => {
    dispatch(setStatus('loading'))
    StoryService.fetchStory(storyId)
      .then(s => {
        if (s.data.type === 'story') {
          setStory(s.data)
        }
        dispatch(setStatus('succeeded'))
      })
      .catch(e => {
        if (axios.isAxiosError(e)) {
          const error = e.response
            ? e.response?.data?.message
            : e.message + ', more details in the console'

          dispatch(setError(error))
          dispatch(setStatus('failed'))
        }
      })
  }, [ids])

  return (
    <>
      {story ? (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
            title={<NavLink to={`${storyId}`}>{story.title}</NavLink>}
            description={`Author: ${story.by}`}
          />
          <div>
            <span style={{ fontWeight: 'bold' }}> Rating</span>: {story.score}
            <span style={{ fontWeight: 'bold' }}> Posted</span>: {mapTime(story.time)}
          </div>
        </List.Item>
      ) : (
        <Spin tip="Loading...">
          <List.Item>
            <List.Item.Meta avatar={<Avatar icon={<UserOutlined />} />} />
          </List.Item>
        </Spin>
      )}
    </>
  )
})
