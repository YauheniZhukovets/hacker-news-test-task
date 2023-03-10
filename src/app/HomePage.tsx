import React, { FC, memo } from 'react'

import { ReloadOutlined } from '@ant-design/icons'
import { Button, List, Space } from 'antd'

import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { IStory } from '../models/IStory'
import { refreshComment } from '../store/action/commentAction'
import { fetchStoryIds } from '../store/thunk/storyThunks'

import { Story } from './Story'

export const HomePage: FC = memo(() => {
  const dispatch = useAppDispatch()
  const stories = useAppSelector<IStory[]>(state => state.story.stories)

  const refreshStoriesIds = async () => {
    dispatch(fetchStoryIds())
    dispatch(refreshComment())
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', margin: '0 auto', minWidth: '200px', maxWidth: '70%' }}
    >
      <Button loading={!stories.length} onClick={refreshStoriesIds}>
        <ReloadOutlined />
      </Button>

      <List
        itemLayout="horizontal"
        dataSource={stories}
        renderItem={(s, i) => <Story key={s.id} story={s} index={i} />}
      />
    </Space>
  )
})
