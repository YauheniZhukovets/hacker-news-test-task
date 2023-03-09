import React, { FC, useRef, useState } from 'react'

import { Button, List, Space } from 'antd'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { useObserver } from '../hooks/useObserver'
import { MAX_STORIES, STORY_INCREMENT } from '../shared/storyConst'
import { fetchStoryIds } from '../store/thunk/storyThunk'
import { StatusType } from '../type/Common'
import { NullAnd } from '../type/NullAnd'

import { Story } from './Story'

export const Home: FC = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector<StatusType>(state => state.app.status)
  const ids = useAppSelector<number[]>(state => state.story.ids)
  const [count, setCount] = useState<number>(STORY_INCREMENT)
  const lastElement = useRef<NullAnd<HTMLDivElement>>(null)

  const refreshStoriesIds = async () => {
    await dispatch(fetchStoryIds())
    setCount(0)
  }

  const fetchPortionStories = () => {
    if (count < MAX_STORIES) {
      setCount(count + STORY_INCREMENT)
    }
  }

  useObserver(lastElement, fetchPortionStories)

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', margin: '0 auto', minWidth: '200px', maxWidth: '70%' }}
    >
      <Button disabled={status === 'loading'} onClick={refreshStoriesIds}>
        Refresh
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={ids.slice(0, count)}
        renderItem={(s, i) => <Story key={s} storyId={s} index={i} />}
      />
      <div style={{ height: 10 }} ref={lastElement}></div>
    </Space>
  )
}
