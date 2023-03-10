import React, { FC, memo } from 'react'

import { UserOutlined } from '@ant-design/icons'
import { Avatar, List, Spin } from 'antd'
import { NavLink } from 'react-router-dom'

import { IStory } from 'models'
import { mapTime } from 'shared'

type StoryType = {
  story: IStory
  index: number
}
export const Story: FC<StoryType> = memo(({ story, index }) => {
  return (
    <>
      {story.id ? (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
            title={<NavLink to={`${story.id}`}>{story.title}</NavLink>}
            description={`Author: ${story.by}`}
          />
          <div>
            <div>
              <span style={{ fontWeight: 'bold' }}> Posted</span>: {mapTime(story.time)}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}> Comments</span>: {story.descendants}
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}> Rating</span>: {story.score}
            </div>
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
