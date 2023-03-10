import React, { FC, memo } from 'react'

import { ReloadOutlined } from '@ant-design/icons'
import { Button, List, Space } from 'antd'

import { Story } from './Story'

import { useAppDispatch, useAppSelector } from 'hooks'
import { IStory } from 'models'
import { fetchStoryIds, refreshComment } from 'store'

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
        dataSource={stories.length ? stories : []}
        renderItem={(s, i) => <Story story={s} index={i} />}
      />
    </Space>
  )
})
